import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Homepage from "./pages/Homepage";
import Products from "./pages/Products";
import Shop from "./pages/Shop";

const Myroute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/shop" element={<Shop/>}></Route>

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Myroute;
