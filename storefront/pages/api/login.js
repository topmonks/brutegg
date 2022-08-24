import { recoverPersonalSignature } from "@metamask/eth-sig-util";

import { withSessionRoute } from "../../libs/with-session";
import { composeNonce } from "../../libs/web3";
import { log } from "../../libs/logger";
import { swellNodeClient } from "../../libs/swell-node";

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
  log({
    message: "Login attemp",
    ...req.body,
  });
  const recoveredAddress = checkSignature(
    composeNonce(message, date),
    signature
  );

  if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
    res.status(400).send({
      error: `signature check failed, address sent ${address}, recovered address ${recoveredAddress}`,
    });
    log({
      message: "signature check failed",
      address,
      recoveredAddress,
    });
    return;
  }

  const timeDiff = Date.now() - new Date(date).getTime();

  // 10minutes
  if (timeDiff > 6e5) {
    res.status(400).send({
      error: `expired time nonce, time diff ${timeDiff}`,
    });
    log({
      message: "expired time nonce",
      timeDiff,
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

  let {
    results: [user],
  } = await swellNodeClient.get("/accounts", {
    where: {
      public_address: {
        $eq: address,
      },
    },
    limit: 1,
  });

  res.send({
    user: {
      ...req.session.user,
      firstName: user.first_name,
      lastName: user.last_name,
    },
  });
}
