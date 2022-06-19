import { createClient, EntryProps, KeyValueMap } from "contentful-management";

import { Eyewear } from "../types";
import { ICharacteristics } from "../@types/generated/contentful";
import { allowedFilters } from "../utils/constants";

export const client = createClient({
  accessToken: process.env.CONTENTFUL_CMA_TOKEN!,
});

const cdnClient = require("contentful").createClient({
  accessToken: process.env.CONTENTFUL_CDN_TOKEN!,
  space: "ku8ywade9k6u",
  environment: "master",
});

export const getAllCharacteristics = async () => {
  try {
    const characteristics: ICharacteristics[] = (
      await cdnClient.getEntries({
        content_type: "characteristics",
      })
    ).items;
    return characteristics;
  } catch (error) {
    throw error;
  }
};

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
    eyewear.fields.stripeProduct = { "en-US": stripeProduct };
    eyewear.fields.stripePrice = { "en-US": stripePrice };
    const updatedEyewear = await eyewear.update();
    const publishedEyewear = await updatedEyewear.publish();
    return publishedEyewear;
  } catch (error) {
    throw error;
  }
};

export const getEyewears = async (
  pageSize: number,
  pageNumber: number,
  eyewearType?: string,
  filter?: any
) => {
  try {
    const queryObj: any = {
      content_type: "eyewear",
      "fields.eyewearType": eyewearType,
      order: "-fields.price",
      limit: pageSize,
      skip: (pageNumber - 1) * pageSize,
      include: 1,
    };
    Object.keys(filter).forEach((k) => {
      if (allowedFilters.includes(k) && !!filter[k]) {
        queryObj[`fields.${k}[in]`] = filter[k];
      }
    });
    const eyewears = await cdnClient.getEntries(queryObj);

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
