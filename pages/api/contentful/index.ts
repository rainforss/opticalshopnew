import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getEyewearById } from "../../../services/contentful";

const contentfulRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "POST":
        if (req.headers.authorization !== process.env.CONTENTFUL_HOOK_SECRET) {
          throw new Error("Not authenticated");
        }
        const eyeWear = await getEyewearById(req.body.id);
        const description = documentToHtmlString(eyeWear.fields.description);
        const shopifyProduct = {
          product: {
            title: eyeWear.fields.name,
            body_html: description,
            product_type: eyeWear.fields.eyewearType,
            variants: [
              {
                barcode: eyeWear.fields.barcode,
                price: eyeWear.fields.price,
                taxable: true,
              },
            ],
            images: eyeWear.fields.pictures.map((p) => ({
              src: `https:${p.fields.file.url}`,
            })),
          },
        };

        const createdProduct = await axios.post(
          `${process.env.SHOPIFY_ENDPOINT}`,
          shopifyProduct,
          {
            headers: {
              "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_TOKEN!,
              "Content-Type": "application/json",
            },
          }
        );

        console.log(createdProduct);

        return res.status(200).json(createdProduct);
      default:
        throw Error("Not supported");
    }
  } catch (error: any) {
    console.log(error);
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
