// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import { IronSessionOptions, getIronSession } from "iron-session";

export interface User {
  username: string;
  role: "user" | "admin" | "guest";
}

export class AuthenticationError extends Error {
  constructor(message = "Authentication required") {
    super(message);
  }
}

export class AuthorizationError extends Error {
  constructor(message = "Forbidden") {
    super(message);
  }
}

export class CsrfMismatchError extends Error {
  constructor(message = "CSRF Mismatch") {
    super(message);
  }
}

const password =
  process.env.SECRET_COOKIE_PASSWORD ??
  `Yes. Yes, this is a fertile land, and we will thrive. We will rule over all this land, and we will call it... "This Land."`;

export const sessionOptions: IronSessionOptions = {
  password,
  cookieName: "__session",
  cookieOptions: {
    path: "/",
    secure: process.env.NODE_ENV === "production"
  }
};

export type GetSessionParams = Parameters<typeof getIronSession>;
export const getSession = (
  req: GetSessionParams[0],
  res: GetSessionParams[1]
) => getIronSession(req, res, sessionOptions);

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    csrf?: string;
    user?: User;
  }
}

// App puts these on
declare global {
  var user: User;
  interface Window {
    user: User;
  }
}
