import express from "express";
import { getClient } from "../db";
import { Product } from "../models/shop.model";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/products", async (req, res) => {
  const client = await getClient();
  const maxPrice = parseFloat(req.query["max-price"] as string);
  const includes = req.query.includes as string;
  const limit = parseInt(req.query.limit as string) || 5;

  const filter: any = {};

  if (!isNaN(maxPrice)) {
    filter.price = { $lte: maxPrice };
  }

  if (includes) {
    filter.name = { $regex: includes, $options: "i" };
  }

  const products = await client
    .db()
    .collection<Product>("shop_db")
    .find(filter)
    .limit(limit)
    .toArray();

  res.json(products);
});

router.get("/products/:id", async (req, res) => {
  const client = await getClient();
  const id = new ObjectId(req.params.id);

  const product = await client
    .db()
    .collection<Product>("shop_db")
    .findOne({ _id: id });

  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found.");
  }
});

router.post("/products", async (req, res) => {
  const client = await getClient();
  const product: Product = req.body;

  const result = await client
    .db()
    .collection<Product>("shop_db")
    .insertOne(product);

  product._id = result.insertedId;

  res.status(201).json(product);
});

router.put("/products/:id", async (req, res) => {
  const client = await getClient();
  const id = new ObjectId(req.params.id);
  const product: Product = req.body;

  const result = await client
    .db()
    .collection<Product>("shop_db")
    .replaceOne({ _id: id }, product);

  if (result.modifiedCount === 0) {
    res.status(404).send("Product not found.");
  } else {
    product._id = id;
    res.json(product);
  }
});

router.delete("/products/:id", async (req, res) => {
  const client = await getClient();
  const id = new ObjectId(req.params.id);

  const result = await client
    .db()
    .collection<Product>("shop_db")
    .deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    res.status(404).send("Product not found.");
  } else {
    res.sendStatus(204);
  }
});

export default router;
