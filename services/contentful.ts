import { createClient, EntryProps, KeyValueMap } from "contentful-management";
import { createClient as createCdnClient } from "contentful";
import { Eyewear } from "../types";

export const client = createClient({
  accessToken: process.env.CONTENTFUL_CMA_TOKEN!,
});

const cdnClient = createCdnClient({
  accessToken: process.env.CONTENTFUL_CDN_TOKEN!,
  space: "ku8ywade9k6u",
  environment: "master",
});

export const createEyewear = async (
  data: Omit<EntryProps<KeyValueMap>, "sys">
) => {
  try {
    const space = await client.getSpace("ku8ywade9k6u");
    const environment = await space.getEnvironment("master");
    const createdEyewear = await environment.createEntry("eyewear", data);
    const publishedEyewear = await createdEyewear.publish();
    return publishedEyewear;
  } catch (error) {
    throw error;
  }
};

export const updateEyewear = async (
  id: string,
  stripeProduct: string,
  stripePrice: string
) => {
  try {
    const space = await client.getSpace("ku8ywade9k6u");
    const environment = await space.getEnvironment("master");
    const eyewear = await environment.getEntry(id);
    eyewear.fields.stripeProduct["en-US"] = stripeProduct;
    eyewear.fields.stripePrice["en-US"] = stripePrice;
    await eyewear.update();
    const updatedEyewear = await eyewear.publish();
    return updatedEyewear;
  } catch (error) {
    throw error;
  }
};

export const getEyewears = async (pageSize: number, pageNumber: number) => {
  try {
    const eyewears = await cdnClient.getEntries({
      content_type: "eyewear",
      order: "sys.createdAt",
      limit: pageSize,
      skip: (pageNumber - 1) * pageSize,
      include: 1,
    });
    return eyewears;
  } catch (error) {
    throw error;
  }
};

export const getEyewearById = async (eyewearId: string) => {
  try {
    const eyewear: Eyewear = await cdnClient.getEntry(eyewearId);
    return eyewear;
  } catch (error) {
    throw error;
  }
};
