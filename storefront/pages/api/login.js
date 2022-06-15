import { withSessionRoute } from "../../libs/with-session";
import { recoverPersonalSignature } from "@metamask/eth-sig-util";
import { composeNonce } from "../../libs/web3";

function checkSignature(nonce, signature) {
  const msgParams = {
    data: nonce,
    signature: signature,
  };
  console.log(msgParams);
  return recoverPersonalSignature(msgParams);
}

export default withSessionRoute(loginRoute);

async function loginRoute(req, res) {
  const { address, signature, message, date } = req.body;
  const recoveredAddress = checkSignature(
    composeNonce(message, date),
    signature
  );
  console.log({ address, recoveredAddress });
  req.session.user = {
    address: "address",
  };
  try {
    await req.session.save();
  } catch (e) {
    res
      .status(500)
      .send({ error: "failed to save the session", message: e.message });
    return;
  }
  res.send({ ...req.session });
}
