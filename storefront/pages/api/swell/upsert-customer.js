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
  const email = composeVirtualEmailFromAddress(publicAddress);

  const update = {
    email,
    first_name: body.firstName,
    last_name: body.lastName,
    shipping: {
      address1: body.address1,
      address2: body.address2,
      city: body.city,
      zip: body.zip,
      country: body.country,
    },
    public_address: publicAddress,
  };

  if (!user) {
    user = await swellNodeClient.post("/accounts", update);
  } else {
    user = await swellNodeClient.put(`/accounts/${user.id}`, update);
  }

  res.send(user);
}
