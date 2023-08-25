import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../models/Product";
import { getProductById } from "../services/productService";
import "../styles/ProductDetails.css";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (id) {
      getProductById(id).then((response) => {
        setProduct(response.data);
      });
    }
  }, []);

  return (
    <main>
      {product && (
        <div>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <img src={product.photoURL} />
        </div>
      )}
    </main>
  );
};
