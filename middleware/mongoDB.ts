import { Db, MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

type NextApiRequestWithDbClient = NextApiRequest & {
  dbClient: MongoClient;
  db: Db;
};

declare global {
  var mongo: { client: MongoClient };
}

global.mongo = global.mongo || {};

export const getMongoClient = async () => {
  if (!global.mongo.client) {
    global.mongo.client = new MongoClient(process.env.MONGODB_URI!);
  }

  await global.mongo.client.connect();
  return global.mongo.client;
};

export const dbConnect = async () => {
  try {
    if (!global.mongo.client) {
      global.mongo.client = new MongoClient(process.env.MONGODB_URI!);
    }
    const dbClient = await global.mongo.client.connect();
    return dbClient.db("TheOpticalShop");
  } catch (error) {
    throw error;
  }
};

export const dbDisconnect = async () => {
  try {
    if (!global.mongo.client) {
      return;
    }
    await global.mongo.client.close();
    return;
  } catch (error) {
    throw error;
  }
};
