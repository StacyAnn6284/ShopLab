// import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../models/Product";
import "../styles/ProductCard.css";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <li className="ProductList">
      <p>
        <Link to={`/products/${product._id}`}>{product.name}</Link>
      </p>
      <p>{product.price}</p>
      <img src={product.photoURL} />
    </li>
  );
};

//old code in case I break it:
// export const ProductCard = ({ product }: ProductCardProps) => {
//   return (
//     <li className="ProductList">
//       <p>{product.name}</p>
//       <p>{product.price}</p>
//       <img src={product.photoURL} />
//     </li>
//   );
// };
