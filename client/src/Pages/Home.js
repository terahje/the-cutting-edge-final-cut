import React, { useState } from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  useState();
  return (
    <div><CategoryMenu />
    <div className="container">
      <ProductList />
      <Cart />
    </div>
    </div>
  );
};

export default Home;