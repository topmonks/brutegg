import { swellNodeClient } from "../../../libs/swell-node";
import { withSessionRoute } from "../../../libs/with-session";

export default withSessionRoute(getProfileLevels);

async function getProfileLevels(req, res) {
  let { results: levels } = await swellNodeClient.get("/profile-level", {
    sort: "required_spent asc",
  });

  res.send(levels);
  return;
}
