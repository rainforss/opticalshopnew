import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_TOKEN!, {
  apiVersion: "2020-08-27",
});

export const createPrice = async (price: Stripe.PriceCreateParams) => {
  try {
    const createdPrice: Stripe.Price = await stripe.prices.create(price);
    return createdPrice;
  } catch (error) {
    throw error;
  }
};

export const updatePrice = async (
  id: string,
  price: Stripe.PriceUpdateParams
) => {
  try {
    const updatedPrice: Stripe.Price = await stripe.prices.update(id, price);
    return updatedPrice;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (product: Stripe.ProductCreateParams) => {
  try {
    const createdProduct: Stripe.Product = await stripe.products.create(
      product
    );
    return createdProduct;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (
  id: string,
  product: Stripe.ProductUpdateParams
) => {
  try {
    const updatedProduct: Stripe.Product = await stripe.products.update(
      id,
      product
    );
    return updatedProduct;
  } catch (error) {
    throw error;
  }
};
