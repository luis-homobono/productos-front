import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
import ShowProduct from "./pages/ShowProduct";
import EditProduct from "./pages/EditProduct"
import DeleteProduct from "./pages/DeleteProduct";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/create" element={<CreateProduct />} />
      <Route path="/producs/details/:id" element={<ShowProduct />} />
      <Route path="/producs/edit/:id" element={<EditProduct />} />
      <Route path="/producs/delete/:id" element={<DeleteProduct />} />
    </Routes>
  )
}

export default App;