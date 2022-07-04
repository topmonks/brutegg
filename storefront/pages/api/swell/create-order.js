import { swellNodeClient } from "../../../libs/swell-node";
import { withSessionRoute } from "../../../libs/with-session";
import Web3 from "web3";

const web3 = new Web3();

export default withSessionRoute(createOrder);

async function createOrder(req, res) {
  const { transactionHash, cartId } = req.body;

  if (!transactionHash) {
    res.status(401).send({
      message: "Missing transactionHash",
    });
    return;
  }
  if (!cartId) {
    res.status(401).send({
      message: "Missing cartId",
    });
    return;
  }

  res.send({});
}
