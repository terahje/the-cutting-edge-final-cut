import React, { useState } from "react";

import StyleList from "../components/StyleList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";


const Home = () => {
  useState();
  return (
    <div className="container">

    
      <CategoryMenu />
      <StyleList />
      <Cart />
    </div>
  );
};

export default Home;