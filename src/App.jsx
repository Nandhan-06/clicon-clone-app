import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/CategoryPage";
import { useCart } from "./context/CartContext";
import Toast from "./components/Toast";
import SearchPage from "./components/SearchPage";

export default function App() {
  const { toast } = useCart();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/search" element={<SearchPage />} />

      </Routes>
      {toast && <Toast message={toast} />}
    </>
  );
}