import { swellNodeClient } from "../../../libs/swell-node";
import { withSessionRoute } from "../../../libs/with-session";

export default withSessionRoute(getCustomer);

async function getCustomer(req, res) {
  const publicAddress = req?.session?.user?.address;
  if (!publicAddress) {
    res.status(401).end();
    return;
  }

  let {
    results: [user],
  } = await swellNodeClient.get("/accounts", {
    where: {
      public_address: {
        $eq: publicAddress,
      },
    },
    limit: 1,
  });

  res.send(user);
}
