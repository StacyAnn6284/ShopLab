import express from 'express';
import { getClient } from '../db';
import { ObjectId } from 'mongodb';
import { User } from '../models/shop.model';

const router = express.Router();

router.get('/users/:id', async (req, res) => {
  const client = await getClient();
  const id = new ObjectId(req.params.id);

  const user = await client.db().collection<User>('shop_db').findOne({ _id: id });

  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found.');
  }
});

router.post('/users', async (req, res) => {
  const client = await getClient();
  const user: User = req.body;

  const result = await client.db().collection<User>('shop_db').insertOne(user);

  user._id = result.insertedId;

  res.status(201).json(user);
});

router.put('/users/:id', async (req, res) => {
  const client = await getClient();
  const id = new ObjectId(req.params.id);
  const user: User = req.body;

  const result = await client.db().collection<User>('shop_db').replaceOne({ _id: id }, user);

  if (result.modifiedCount === 0) {
    res.status(404).send('User not found.');
  } else {
    user._id = id;
    res.json(user);
  }
});

router.delete('/users/:id', async (req, res) => {
  const client = await getClient();
  const id = new ObjectId(req.params.id);

  const result = await client.db().collection<User>('shop_db').deleteOne({ _id: id });

  if (result.deletedCount === 0) {
    res.status(404).send('User not found.');
  } else {
    res.sendStatus(204);
  }
});

export default router;
