import { Product } from "./Product";

export interface CartItem {
  _id?: string;
  userId: string;
  product: Product;
  quantity: number;
}
