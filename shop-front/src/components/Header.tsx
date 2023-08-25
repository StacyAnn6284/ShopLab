import { Link } from "react-router-dom";
import "../styles/Header.css";

export const Header = () => {
  return (
    <header className="Header">
      <h1>
        <Link to="/">Shop</Link>
      </h1>
      <h3>
        <Link to="/products">Products</Link>
      </h3>
    </header>
  );
};
