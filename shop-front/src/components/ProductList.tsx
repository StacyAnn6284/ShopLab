// import { FormEvent, useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Product } from "../models/Product";
import { getAllProducts } from "../services/productService";
import { Filter } from "./Filter";
import { ProductCard } from "./ProductCard";

// interface ProductListProps {
//   products: Product[];
// }

export const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const maxPrice =
      searchParams.get("max-price") !== null
        ? parseFloat(searchParams.get("max-price") as string)
        : null;

    const includes = searchParams.get("includes");

    const limit =
      searchParams.get("max-price") !== null
        ? parseInt(searchParams.get("limit") as string)
        : null;

    getAllProducts(maxPrice, includes, limit).then((data) => {
      setProducts(data);
    });
  }, [searchParams]);

  return (
    <div className="ProductList">
      <Filter></Filter>
      <ul>
        {products.map((product: Product) => (
          <ProductCard product={product}></ProductCard>
        ))}
      </ul>
    </div>
  );
};
