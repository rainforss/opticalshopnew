import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../middleware/session";
import { getAllCharacteristics } from "../../../services/contentful";

const characteristicRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    switch (req.method) {
      case "GET":
        const characteristics = await getAllCharacteristics();
        return res.status(200).json(characteristics);
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

export default withSessionRoute(characteristicRoute);
