import { swellNodeClient } from "../../../libs/swell-node";
import { withSessionRoute } from "../../../libs/with-session";
import Web3 from "web3";
import {
  BRUTE_TREASURY_ADDRESS,
  INFURA_ENDPOINTS,
} from "../../../libs/constants";
import { calculateCartPrice } from "../../../libs/swell";

export default withSessionRoute(createOrder);

async function createOrder(req, res) {
  const { cartId, chainId } = req.body;

  if (!cartId) {
    res.status(400).send({
      message: "Missing cartId",
    });
    return;
  }

  if (!chainId) {
    res.status(400).send({
      message: "Missing chainId",
    });
    return;
  }

  const cart = await swellNodeClient.get("/carts/{id}", {
    id: cartId,
    expand: ["items.product"],
  });

  if (!cart) {
    res.status(404).send({
      message: "Cart not found",
    });
    return;
  }

  const transactionHash = cart.metadata?.transactionHash;

  if (!transactionHash) {
    res.status(400).send({
      message: "Cart transaction hash is missing",
    });
    return;
  }

  const rpcNode = INFURA_ENDPOINTS[chainId];

  if (!rpcNode) {
    res.status(400).send({
      message: "Unknown chainId",
    });
    return;
  }

  const treasuryAddress = BRUTE_TREASURY_ADDRESS[chainId];

  if (!treasuryAddress) {
    res.status(400).send({
      message: "Unknown treasuryAddress",
    });
    return;
  }

  const web3 = new Web3(rpcNode);

  const cost = calculateCartPrice(cart, web3);

  const costInWei = web3.utils.toWei(cost, "ether").toString();

  const receipt = await web3.eth.getTransactionReceipt(transactionHash);

  if (!receipt) {
    res.status(400).send({
      message: `Tx not found ${transactionHash}`,
    });
    return;
  }

  if (!receipt.status) {
    res.status(400).send({
      message: `Tx status not successfull ${receipt.transactionHash}, ${receipt.status}`,
    });
    return;
  }

  const tx = await web3.eth.getTransaction(transactionHash);

  const erc20TransferABI = [
    {
      type: "address",
      name: "receiver",
    },
    {
      type: "uint256",
      name: "amount",
    },
    {
      internalType: "bytes32",
      name: "nonce",
      type: "bytes32",
    },
  ];
  const decoded = web3.eth.abi.decodeParameters(
    erc20TransferABI,
    tx.input.slice(10)
  );

  const isReceiverCorrect = decoded.receiver === treasuryAddress;
  const isAmountCorrect = decoded.amount === costInWei;
  const isCartIdCorrect = web3.utils.toUtf8(decoded.nonce) === cartId;

  if (!isCartIdCorrect) {
    res.status(400).send({
      message: `Tx nonce ${decoded.nonce} differs from ${cartId}`,
    });
    return;
  }

  if (!isReceiverCorrect) {
    res.status(400).send({
      message: `Tx receiver is not correct expected ${treasuryAddress}, received ${decoded.receiver}`,
    });
    return;
  }

  if (!isAmountCorrect) {
    res.status(400).send({
      message: `Tx amount is not correct expected ${costInWei}, received ${decoded.amount}`,
    });
    return;
  }

  const order = await swellNodeClient.post("/orders", {
    cart_id: cartId,
    billing: {
      method: "brute_token",
    },
  });

  res.send(order);
}
