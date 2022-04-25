import { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";

const sessionOptions: IronSessionOptions = {
  cookieName: "theopticalshoponwhyte",
  password: process.env.SECRET_COOKIE_PASSOWRD!,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 2 * 7 * 24 * 60 * 60,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, sessionOptions);
}
