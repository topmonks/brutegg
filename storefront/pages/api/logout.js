import { withSessionRoute } from "../../libs/with-session";

export default withSessionRoute(logoutRoute);

async function logoutRoute(req, res) {
  req.session.destroy();
  res.send({ ok: true });
}
