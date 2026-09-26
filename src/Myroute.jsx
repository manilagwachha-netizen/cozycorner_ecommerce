import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Homepage from "./pages/Homepage";
import Products from "./pages/Products";
import Footer from "./components/Footer";

const Myroute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />}></Route>
          <Route path="/products" element={<Products />}></Route>

            <Route path="/footer" element={<Footer/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Myroute;
