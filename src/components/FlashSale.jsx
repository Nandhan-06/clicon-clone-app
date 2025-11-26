// src/components/FlashSale.jsx
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import "./FlashSale.css";

const allowedCategories = [
  "smartphones",
  "laptops",
  "mens-watches",
  "womens-watches",
  "tablets",
  "mobile-accessories",
];

export default function FlashSale() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Quick View State
  const [quickView, setQuickView] = useState(null);
  const [qty, setQty] = useState(1);

  const { addToCart } = useCart();

  // Fetch Products
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products?limit=100");
        const filtered = res.data.products.filter((item) =>
          allowedCategories.includes(item.category)
        );
        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const getRandomItems = (arr, count) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const flashSaleProducts = useMemo(() => {
    const eligible = products.filter(
      (p) => p.discountPercentage >= 15 && p.stock > 0
    );
    return getRandomItems(eligible, 3);
  }, [products]);

  const bestSellerProducts = useMemo(() => {
    const eligible = products.filter((p) => p.stock > 0 && p.stock < 50);
    return getRandomItems(eligible, 3);
  }, [products]);

  const topRatedProducts = useMemo(() => {
    const eligible = products.filter((p) => p.rating >= 4.9);
    return getRandomItems(eligible, 3);
  }, [products]);

  const newArrivalProducts = useMemo(() => {
    const eligible = products.filter((p) => p.stock >= 70);
    return getRandomItems(eligible, 3);
  }, [products]);

  if (loading) {
    return <div className="sales-loading">Loading products...</div>;
  }

  // QuickView Helper Functions
  const openQuickView = (product) => {
    setQty(1);
    setQuickView(product);
  };

  const closeQuickView = () => setQuickView(null);

  // Placeholder Image (same as BestDeals)
  const placeholder =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='#f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-size='20'>Image not available</text></svg>`
    );

  const ProductCard = ({ product }) => (
    <div
      className="product-mini-card"
      onClick={() => openQuickView(product)}
    >
      <div className="product-mini-image">
        <img src={product.thumbnail || placeholder} alt={product.title} />
      </div>

      <div className="product-mini-info">
        <h4>{product.title}</h4>

        <p className="product-mini-desc">
          {product.description.slice(0, 50)}...
        </p>

        <div className="product-mini-price">
          <span className="current">${product.price}</span>

          {product.discountPercentage > 0 && (
            <span className="original">
              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(
                2
              )}
            </span>
          )}
        </div>

        {/* Hover Icons
        <div className="flash-hover-icons">
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert("Added to wishlist (demo)");
            }}
          >
            <FiHeart />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
          >
            <FiShoppingCart />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
          >
            <FiEye />
          </button>
        </div>*/}
      </div> 
    </div>
  );

  const SalesBox = ({ title, products }) => (
    <div className="sales-box">
      <div className="sales-box-header">
        <h3>{title}</h3>
      </div>

      <div className="sales-box-content">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="no-products">No products available</p>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="sales-section">
        <div className="sales-container">
          <SalesBox title="Flash Sale" products={flashSaleProducts} />
          <SalesBox title="Best Sellers" products={bestSellerProducts} />
          <SalesBox title="Top Rated" products={topRatedProducts} />
          <SalesBox title="New Arrivals" products={newArrivalProducts} />
        </div>
      </div>

      {/* =============================== */}
      {/* QUICK VIEW MODAL (Same as BestDeals) */}
      {/* =============================== */}
      {quickView && (
        <div className="quickview-backdrop" onClick={closeQuickView}>
          <div className="quickview" onClick={(e) => e.stopPropagation()}>
            <button className="qv-close" onClick={closeQuickView}>
              ×
            </button>

            <div className="qv-left">
              <img
                src={quickView.thumbnail || placeholder}
                alt={quickView.title}
              />
            </div>

            <div className="qv-right">
              <h2>{quickView.title}</h2>
              <p className="qv-desc">{quickView.description}</p>

              <div className="qv-meta">
                <div className="qv-price">${quickView.price}</div>

                {quickView.discountPercentage > 0 && (
                  <div className="qv-discount">
                    {Math.round(quickView.discountPercentage)}% off
                  </div>
                )}
              </div>

              <div className="qv-actions">
                <label>Qty:</label>

                <div className="qty-selector">
                  <button
                    onClick={() => setQty((prev) => (prev > 1 ? prev - 1 : 1))}
                  >
                    -
                  </button>

                  <div className="qty-display">{qty}</div>

                  <button onClick={() => setQty((prev) => prev + 1)}>+</button>
                </div>

                <button
                  className="btn-primary"
                  onClick={() => addToCart(quickView, qty)}
                >
                  Add to Cart
                </button>

                <button className="btn-secondary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
