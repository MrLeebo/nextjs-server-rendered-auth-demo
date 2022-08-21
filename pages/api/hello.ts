import { withApiSession } from "auth/sessionUtils";

export default withApiSession(async (req, res) => {
  res.json({ message: "hello, world!" });
});
