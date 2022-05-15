import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../../middleware/session";
import { createEyewear, getEyewears } from "../../../services/contentful";
import { transformToLocalizedObject } from "../../../utils/dataTransform";

const eyewearRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "POST":
        const user = req.session.user;
        if (!user) {
          throw Error("Not authenticated");
        }
        if (!user.isAdmin) {
          throw Error("Not authorized");
        }
        const transformedData = transformToLocalizedObject(req.body);
        const createdEyewear = await createEyewear({ fields: transformedData });

        return res.status(200).json(createdEyewear);
      case "GET":
        const { pageSize, pageNumber, collectionName, filter } = req.query;
        const eyewears = await getEyewears(
          parseInt(pageSize as string),
          parseInt(pageNumber as string),
          collectionName as string,
          filter as string
        );
        return res.status(200).json(eyewears);
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

export default withSessionRoute(eyewearRoute);
