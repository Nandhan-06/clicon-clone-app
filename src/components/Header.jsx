import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { FiHeart, FiShoppingCart, FiUser, FiChevronDown, FiSearch } from "react-icons/fi";
import {
  FaTwitter,
  FaFacebook,
  FaPinterestP,
  FaReddit,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { PiHeadphones, PiInfoThin } from "react-icons/pi";
import "./Header.css";

const allowedCategories = [
  "smartphones",
  "laptops",
  "mens-watches",
  "womens-watches",
  "tablets",
  "mobile-accessories",
];

// SearchBar component with proper className
const SearchBar = ({ navigate }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    
    if (!query) return;

    try {
      const allProducts = [];

      // Fetch from all categories
      for (const category of allowedCategories) {
        const res = await axios.get(
          `https://dummyjson.com/products/category/${category}`
        );
        allProducts.push(...res.data.products);
      }

      // Filter products matching the search query
      const matched = allProducts.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );

      // Navigate to search results page
      navigate("/search", { state: { results: matched, query } });
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="header-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for anything..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FiSearch className="search-icon" />
      </form>
    </div>
  );
};

function Header({
  showTopBanner = true,
  showSocialStrip = true,
  showNav = true,
}) {
  const navigate = useNavigate();
  const [cartCount] = useState(3);
  const [showBanner, setShowBanner] = useState(showTopBanner);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  return (
    <header className="site-header">
      {/* ===== BLACK OFFER BANNER ===== */}
      {showBanner && showTopBanner && (
        <div className="offer-banner">
          <div className="offer-badge-wrapper">
            <div className="offer-badge">Black</div>
            <span>Friday</span>
          </div>

          <p className="offer-text">
            Up to <span className="offer-percent">59%</span> OFF
          </p>
           
          <button className="shop-now-btn">
            Shop Now →
          </button>

          <button
            onClick={() => setShowBanner(false)}
            className="close-banner-btn"
          >
            ✕
          </button>
        </div>
      )}

      {/* ===== SOCIAL STRIP ===== */}
      {showSocialStrip && (
        <div className="social-strip">
          <div className="welcome-text">Welcome to Clicon online eCommerce store.</div>

          <div className="social-right">
            <p>Follow us on:</p>
            <FaTwitter />
            <FaFacebook />
            <FaPinterestP />
            <FaReddit />
            <FaYoutube />
            <FaInstagram />

            <div className="divider"></div>

            <span className="dropdown-toggle">
              Eng <FiChevronDown className="chevron-symbol" />
            </span>

            <span className="dropdown-toggle">
              USD <FiChevronDown className="chevron-symbol" />
            </span>
          </div>
        </div>
      )}

      {/* ===== MAIN HEADER (LOGO + SEARCH + ICONS) ===== */}
      <div className="header">
        <div className="header-left">
          <h2 
            className="logo" 
            onClick={() => navigate("/")}
          >
            CLICON
          </h2>
          
        </div>
<div className="header-center">
    <SearchBar navigate={navigate} />
  </div>
        <div className="header-right">
          <div
            className="cart-wrapper"
            onClick={() => navigate("/cart")}
          >
            <FiShoppingCart className="header-icon" />
            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount}
              </span>
            )}
          </div>
          <FiHeart className="header-icon" />
          <FiUser className="header-icon" />
        </div>
      </div>

      {/* ===== NAV + CATEGORY DROPDOWN ===== */}
      {showNav && (
        <nav className="main-nav">
          {/* Category Button */}
          <div
            className="category-toggle"
            onClick={() => setShowCategoryDropdown((s) => !s)}
          >
            All Category{" "}
            <FiChevronDown className={showCategoryDropdown ? "rotate" : ""} />

            {/* DROPDOWN */}
            {showCategoryDropdown && (
              <div className="category-dropdown">
                {allowedCategories.map((cat) => (
                  <div
                    key={cat}
                    className="category-item"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/category/${cat}`);
                      setShowCategoryDropdown(false);
                    }}
                  >
                    {cat.replace("-", " ")}
                  </div>
                ))}
              </div>
            )}
          </div>

          <a href="#" className="nav-link">Track Order</a>
          <a href="#" className="nav-link">Compare</a>
          <a href="#" className="nav-link">
            <PiHeadphones /> Customer Support
          </a>
          <a href="#" className="nav-link">
            <PiInfoThin /> Need Help
          </a>
        </nav>
      )}
    </header>
  );
}

export default Header;