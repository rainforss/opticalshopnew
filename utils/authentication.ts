import { IncomingMessage } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

export const isAuthenticated = (
  req: IncomingMessage & { cookies: NextApiRequestCookies }
) => {
  if (!req.session.user) {
    return false;
  }
  return true;
};

export const isAdmin = (
  req: IncomingMessage & { cookies: NextApiRequestCookies }
) => {
  if (!req.session.user) {
    return false;
  }
  if (!req.session.user.isAdmin) {
    return false;
  }
  return true;
};
