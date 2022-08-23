import { swellNodeClient } from "../../../libs/swell-node";
import { withSessionRoute } from "../../../libs/with-session";

export default withSessionRoute(getProfileLevels);

async function getProfileLevels(req, res) {
  let { results: levels } = await swellNodeClient.get("/profile-level", {
    sort: "required_spent asc",
  });

  let { spentBrute } = req.query;

  spentBrute = parseInt(spentBrute);

  if (spentBrute == null) {
    res.send(levels);
    return;
  }

  console.log(levels, spentBrute);

  let currentLevel;

  for (const level of levels) {
    if (level.required_spent <= spentBrute) {
      currentLevel = level;
    } else {
      continue;
    }
  }

  res.send(currentLevel);
  return;
}
