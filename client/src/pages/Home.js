import React from "react";
import styleList from "../components/styleList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <styleList />
      <Cart />
    </div>
  );
};

export default Home;