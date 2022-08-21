// NOTE: for some reason this can't be bundled with the other
// session module. I think referencing the module in getInitialProps
// causes it to ship server-side dependencies in the client bundle,
// so these have to be kept separate.
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import { randomUUID } from "crypto";
import cookie from "cookie";
import { parseBody } from "./ssrUtils";
import {
  GetSessionParams,
  sessionOptions,
  User,
  CsrfMismatchError
} from "./session";

export const saveSession = async (
  req: GetSessionParams[0],
  res: GetSessionParams[1],
  user: User = req.session?.user ?? { username: "guest", role: "guest" }
) => {
  if (!req.session) return;

  Object.assign(req.session, { csrf: randomUUID(), user });
  await req.session.save();

  const antiCsrfCookie = cookie.serialize("__csrf", req.session.csrf, {
    path: "/",
    secure: process.env.NODE_ENV === "production"
  });

  res.setHeader(
    "Set-Cookie",
    // iron-session may already be setting a session cookie, so we
    // want to make sure that we don't overwrite that, or else the
    // user won't be able to log in.
    [antiCsrfCookie].concat(res.getHeader("Set-Cookie") as string | string[])
  );
};

type ApiHandler = Parameters<typeof withIronSessionApiRoute>[0];
export const withApiSession = (handler: ApiHandler) =>
  withIronSessionApiRoute((req, res) => {
    const { __csrf: csrfToken } = req.body;
    if (req.method !== "GET" && req.session?.csrf !== csrfToken) {
      return res.status(403).send("CSRF Token Mismatch");
    }

    return handler(req, res);
  }, sessionOptions);

const refreshCsrfToken = async ({ req, res }) => {
  await saveSession(req, res);
  return { props: {} };
};

type SsrHandler = Parameters<typeof withIronSessionSsr>[0];
export const withSsrSession = (handler: SsrHandler = refreshCsrfToken) =>
  withIronSessionSsr(async (context) => {
    const { req, res } = context;
    if (req.method === "POST") {
      await parseBody(req, res);
      // TODO: typescript-ify this
      const { __csrf: csrfToken } = req["body"];

      if (req.session?.csrf !== csrfToken) throw new CsrfMismatchError();
    }

    return handler(context);
  }, sessionOptions);

export const withAuthenticatedSession = (
  handler: SsrHandler = refreshCsrfToken
) =>
  withSsrSession((context) => {
    const { user } = context.req.session;

    if (!user || user.role === "guest") {
      return { redirect: { destination: "/login", permanent: false } };
    }

    return handler(context);
  });

export const withAdminSession = (handler: SsrHandler = refreshCsrfToken) =>
  withAuthenticatedSession((context) => {
    const { user } = context.req.session;

    if (user?.role !== "admin") {
      return { redirect: { destination: "/forbidden", permanent: false } };
    }

    return handler(context);
  });
