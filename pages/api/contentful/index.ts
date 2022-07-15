import { NextApiRequest, NextApiResponse } from "next";
import { getEyewearById } from "../../../services/contentful";

const contentfulRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "POST":
        console.log(req.headers.authorization);
        if (req.headers.authorization !== process.env.CONTENTFUL_HOOK_SECRET) {
          throw new Error("Not authenticated");
        }
        const eyeWear = await getEyewearById(req.body.id);

        return res.status(200).json(eyeWear);
      default:
        throw Error("Not supported");
    }
  } catch (error: any) {
    if (error.message === "Not authenticated") {
      return res.status(401).json({
        error: {
          name: "Not authenticated",
          message: "Please login to view this information.",
        },
      });
    }
    if (error.message === "Not authorized") {
      return res.status(403).json({
        error: {
          name: "Not authorized",
          message:
            "You do not have the administrator rights to perform this action",
        },
      });
    }
    if (error.message === "Not supported") {
      return res.status(405).json({
        error: {
          name: "Not allowed",
          message: "HTTP method not supported",
        },
      });
    }
    return res.status(500).json(error);
  }
};

export default contentfulRoute;
