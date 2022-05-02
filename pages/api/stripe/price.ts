import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getEyewearById, updateEyewear } from "../../../services/contentful";
import { createPrice, createProduct } from "../../../services/stripe";

const priceRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "POST":
        const authorizationHeader = req.headers.authorization;
        const decodedToken = new Buffer(
          authorizationHeader!.split(" ")[1],
          "base64"
        ).toString();
        console.log(decodedToken);
        if (decodedToken !== process.env.CONTENTFUL_CMA_TOKEN + ":") {
          throw Error("Not authenticated");
        }
        const eyewear = await getEyewearById(req.body.id);
        if (!eyewear.fields.stripeProduct || !eyewear.fields.stripePrice) {
          const newProductParams: Stripe.ProductCreateParams = {
            id: eyewear.sys.id,
            name: eyewear.fields.name,
            images: [`https:${eyewear.fields.pictures[0].fields.file.url}`],
            shippable: true,
          };
          const newProduct = await createProduct(newProductParams);
          console.log(newProduct);
          const newPriceParams: Stripe.PriceCreateParams = {
            currency: "cad",
            product: newProduct.id,
            unit_amount: eyewear.fields.price * 100,
          };
          const newPrice = await createPrice(newPriceParams);
          console.log(newPrice);
          const updatedEyewear = await updateEyewear(
            eyewear.sys.id,
            newProduct.id,
            newPrice.id
          );
          console.log(updatedEyewear);
          return res.status(200).json({ ok: true });
        }

        console.log("No actions needed");
        return res.status(200).json({ message: "No actions needed." });
      case "GET":
        return res.status(200).json({ ok: true });
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

export default priceRoute;
