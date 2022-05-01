import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect, dbDisconnect } from "../../../middleware/mongoDB";
import bcrypt from "bcrypt";
import { withSessionRoute } from "../../../middleware/session";

declare module "next" {
  interface NextApiRequest {
    db: Db;
  }
}

export type User = {
  email: string;
  password: string;
};

export type CurrentUser = {
  email: string;
  name: string;
  id: string;
  isAdmin: boolean;
};

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: string;
      email: string;
      name: string;
      isAdmin: boolean;
    };
  }
}

const loginRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userInfo: User = req.body;
    const db = await dbConnect();
    const user = await db
      .collection("users")
      .findOne({ email: userInfo.email });
    if (!user) {
      throw new Error("User not found");
    }
    const isValidPassword = await bcrypt.compare(
      userInfo.password,
      user.password
    );
    if (!isValidPassword) {
      throw new Error("Incorrect credentials");
    }
    req.session.user = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    };
    await req.session.save();
    await dbDisconnect();
    return res.status(200).json(req.session.user);
  } catch (error: any) {
    await dbDisconnect();
    if (
      error.message === "User not found" ||
      error.message === "Incorrect credentials"
    ) {
    }
  }
};

export default withSessionRoute(loginRoute);
