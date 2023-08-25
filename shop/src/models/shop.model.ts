import { ObjectId } from 'mongodb';

export interface CartItem {
  _id?: ObjectId;
  userId: ObjectId;
  product: Product;
  quantity: number;
}

export interface Product {
  _id?: ObjectId;
  name: string;
  price: number;
  photoURL?: string;
}

export interface User {
  _id?: ObjectId;
  displayName: string;
  photoURL: string;
  darkTheme: boolean;
}
