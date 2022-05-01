import { Document } from "@contentful/rich-text-types";

export type Eyewear = {
  sys: {
    id: string;
    updatedAt: string;
  };
  fields: {
    name: string;
    barcode: string;
    price: number;
    eyewearType: string;
    description: Document;
    inStock: boolean;
    eyeSize: number;
    bridgeWidth: number;
    templeLength: number;
    material: string;
    colorGroup: string;
    frameColor: string;
    frameShape: string;
    frameType: string;
    hingeType: string;
    nosePads: boolean;
    row: number;
    column: number;
    pictures: Array<Picture>;
    stripePaymentLink: string;
  };
};

export type Picture = {
  sys: {
    id: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    description: string;
    file: {
      url: string;
      fileName: string;
      details: {
        image: {
          width: number;
          height: number;
        };
      };
    };
  };
};
