import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../middleware/session";

const userRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = req.session.user;
    if (!user) {
      throw Error("Not authenticated");
    }
    return res.status(200).json(user);
  } catch (error: any) {
    if (error.message === "Not authenticated") {
      return res.status(401).json({
        error: {
          name: "Not authenticated",
          message: "Please login to view this information.",
        },
      });
    }
  }
};

export default withSessionRoute(userRoute);
