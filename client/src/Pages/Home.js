import React from "react";
import StyleList from "../components/StyleList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import Landing from "../components/Landing";

const Home = () => {
  return (
    <div className="container">
      <Landing />
      <CategoryMenu />
      <StyleList />
      <Cart />
    </div>
  );
};

export default Home;