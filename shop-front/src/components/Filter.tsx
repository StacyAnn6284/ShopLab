import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/Filter.css";

export const Filter = () => {
  const [maxPrice, setMaxPrice] = useState(200);
  const [includes, setIncludes] = useState("");
  const [limit, setLimit] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearchParams((prev) => ({
          ...prev,
          "max-price": maxPrice,
          includes: includes,
          limit: limit,
        }));
      }}
    >
      <label htmlFor="max-price">Max Price: {maxPrice}</label>
      <input
        type="range"
        name="max-price"
        id="price"
        min={0}
        max={200}
        onChange={(e) => {
          setMaxPrice(parseInt(e.target.value));
        }}
        value={maxPrice}
      />
      <label htmlFor="includes">Includes</label>
      <input
        type="text"
        onChange={(e) => {
          setIncludes(e.target.value);
        }}
        value={includes}
      ></input>
      <label htmlFor="limit">Limit</label>
      <select
        name="limit"
        id="limit"
        onChange={(e) => {
          setLimit(parseInt(e.target.value));
        }}
      >
        <option value={10}>10</option>
        <option value={5}>5</option>
        <option value={2}>2</option>
      </select>

      <button> Filter</button>
    </form>
  );
};
