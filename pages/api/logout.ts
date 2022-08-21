import { withApiSession } from "auth/sessionUtils";

export default withApiSession(async (req, res) => {
  req.session.destroy();
  res.redirect(303, "/");
});
