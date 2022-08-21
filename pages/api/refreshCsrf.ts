import { saveSession, withApiSession } from "auth/sessionUtils";

export default withApiSession(async (req, res) => {
  await saveSession(req, res);
  res.json({});
});
