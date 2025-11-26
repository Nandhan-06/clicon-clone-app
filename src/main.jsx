import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./context/CartContext";   // ⭐ IMPORT THIS

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>         {/* ⭐ WRAP HERE */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);


// // src/main.jsx - Your Vite entry point
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import { CartProvider } from './context/CartContext'
// import './styles.css'
// import './styles/cart.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     {/* IMPORTANT: Wrap your app with CartProvider */}
//     <CartProvider>
//       <App />
//     </CartProvider>
//   </React.StrictMode>,
// )

// ============================================
// src/App.jsx - Main App Component
// ============================================
// import { useState } from 'react'
// import Home from './pages/Home'
// import Cart from './pages/Cart'

// export default function App() {
//   const [currentPage, setCurrentPage] = useState('home');

//   // Simple routing (you can use React Router later)
//   return (
//     <>
//       {currentPage === 'home' && <Home setPage={setCurrentPage} />}
//       {currentPage === 'cart' && <Cart setPage={setCurrentPage} />}
//     </>
//   );
// }

// ============================================
// src/pages/Home.jsx - Your existing Home page
// ============================================
// import Header from "../components/Header";
// import Carousel from "../components/Carousel";
// import FlashSale from "../components/FlashSale";

// export default function Home({ setPage }) {
//   return (
//     <>
//       <Header setPage={setPage} />
//       <Carousel />
//       <FlashSale />
//     </>
//   );
// }

// ============================================
// Example: How to use Cart in ProductCard
// ============================================
// import { useCart } from '../context/CartContext';

// function ProductCard({ product }) {
//   const { addToCart } = useCart(); // Get addToCart function

//   const handleAddToCart = () => {
//     addToCart(product);
//     alert('Added to cart!');
//   };

//   return (
//     <div className="product-card">
//       <img src={product.image} alt={product.name} />
//       <h3>{product.name}</h3>
//       <p>${product.price}</p>
      
//       {/* Use addToCart on button click */}
//       <button onClick={handleAddToCart}>
//         Add to Cart
//       </button>
//     </div>
//   );
// }

// ============================================
// Example: Update Header to show cart count
// ============================================
// import { useCart } from '../context/CartContext';

// export default function Header({ setPage }) {
//   const { cartCount } = useCart(); // Get cart count

//   return (
//     <header className="header">
//       <h1>ElectroShop</h1>
//       <nav>
//         <button onClick={() => setPage('home')}>Home</button>
//         <button onClick={() => setPage('cart')}>
//           Cart ({cartCount})
//         </button>
//       </nav>
//     </header>
//   );
// }