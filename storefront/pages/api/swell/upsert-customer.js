import { swellNodeClient } from "../../../libs/swell-node";
import { composeVirtualEmailFromAddress } from "../../../libs/web3";
import { withSessionRoute } from "../../../libs/with-session";

export default withSessionRoute(upsertCustomerRoute);

async function upsertCustomerRoute(req, res) {
  const publicAddress = req?.session?.user?.address;
  if (!publicAddress) {
    res.status(401).end();
    return;
  }

  const email = composeVirtualEmailFromAddress(publicAddress);

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

  const body = req.body;
  console.log(body);
  const update = {
    email,
    shipping: {
      address1: "Pod svahem 20",
      city: "Praha",
      zip: "14700",
      country: "CZ",
    },
    public_address: publicAddress,
  };

  if (!user) {
    user = await swellNodeClient.post("/accounts", update);
  } else {
    await swellNodeClient.put(`/accounts/${user.id}}`, update);
  }

  res.send(user);
}
