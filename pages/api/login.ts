import { withApiSession } from "auth/sessionUtils";
import { saveSession } from "auth/sessionUtils";
import * as db from "db";

// All pages/api/ endpoints that depend on the user's session should
// wrap their handler inside withApiSession()
export default withApiSession(async (req, res) => {
  const { username, password } = req.body;
  const user = await db.findUserByCredentials(username, password);

  await saveSession(req, res, user);

  // TODO: implement redirect url
  res.redirect(303, "/");
});
