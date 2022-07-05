import { withSessionRoute } from "../../libs/with-session";
import { recoverPersonalSignature } from "@metamask/eth-sig-util";
import { composeNonce } from "../../libs/web3";

function checkSignature(nonce, signature) {
  const msgParams = {
    data: nonce,
    signature: signature,
  };
  return recoverPersonalSignature(msgParams);
}

export default withSessionRoute(loginRoute);

async function loginRoute(req, res) {
  const { address, signature, message, date } = req.body;
  const recoveredAddress = checkSignature(
    composeNonce(message, date),
    signature
  );

  if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
    res.status(400).send({
      error: `signature check failed, address sent ${address}, recovered address ${recoveredAddress}`,
    });
    return;
  }

  const timeDiff = Date.now() - new Date(date).getTime();

  // 10minutes
  if (timeDiff > 6e5) {
    res.status(400).send({
      error: `expired time nonce, time diff ${timeDiff}`,
    });
    return;
  }

  req.session.user = {
    address,
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
