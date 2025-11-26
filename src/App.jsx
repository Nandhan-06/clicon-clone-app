// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Cart from "./pages/Cart";

// export default function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/Cart" element={<Cart />} />
//       </Routes>
//     </>
//   );
// }

// export default function App() {
//   const [currentPage, setCurrentPage] = useState("home");

//   return (
//     <>
//       {currentPage === "home" && <Home setPage={setCurrentPage} />}
//       {currentPage === "cart" && <Cart setPage={setCurrentPage} />}
//     </>
//   );
// }


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