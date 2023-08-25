import express from "express";
import { ObjectId } from "mongodb";
import { getClient } from "../db";
import { Product } from "../models/shop.model";

const router = express.Router();

router.get("/users/:userId/cart", async (req, res) => {
  const client = await getClient();
  const userId = new ObjectId(req.params.userId);

  const cartItems = await client
    .db()
    .collection("shop_db")
    .find({ userId })
    .toArray();

  res.json(cartItems);
});

router.post("/users/:userId/cart", async (req, res) => {
  const client = await getClient();
  const userId = new ObjectId(req.params.userId);
  const product: Product = req.body;

  const existingItem = await client
    .db()
    .collection("shop_db")
    .findOne({ userId, "product.name": product.name });

  if (existingItem) {
    existingItem.quantity += 1;
    const result = await client
      .db()
      .collection("shop_db")
      .replaceOne({ _id: existingItem._id }, existingItem);

    res.status(201).json(existingItem);
  } else {
    const result = await client
      .db()
      .collection("shop_db")
      .insertOne({ userId, product, quantity: 1 });

    res.status(201).json(result);
  }
});

router.patch("/users/:userId/cart/:productId", async (req, res) => {
  const client = await getClient();
  const userId = new ObjectId(req.params.userId);
  const productId = new ObjectId(req.params.productId);
  const quantity = req.body.quantity;

  const result = await client
    .db()
    .collection("shop_db")
    .updateOne({ userId, _id: productId }, { $set: { quantity } });

  if (result.modifiedCount === 0) {
    res.status(404).send("Cart item not found.");
  } else {
    res.sendStatus(204);
  }
});

router.delete("/users/:userId/cart/:productId", async (req, res) => {
  const client = await getClient();
  const userId = new ObjectId(req.params.userId);
  const productId = new ObjectId(req.params.productId);

  const result = await client
    .db()
    .collection("shop_db")
    .deleteOne({ userId, _id: productId });

  if (result.deletedCount === 0) {
    res.status(404).send("Cart item not found.");
  } else {
    res.sendStatus(204);
  }
});

export default router;
