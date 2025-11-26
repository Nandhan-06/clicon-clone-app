import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; 
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

  const [quickView, setQuickView] = useState(null);
  const [qty, setQty] = useState(1);

  const { addToCart } = useCart();
  const navigate = useNavigate(); 

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

  const openQuickView = (product) => {
    setQty(1);
    setQuickView(product);
  };

  const closeQuickView = () => setQuickView(null);

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
              <div className="rating-header">
                <div className="stars">
                  {[...Array(5)].map((_, i) =>
                    i < Math.floor(quickView.rating) ? (
                      <FaStar key={i} className="star filled" />
                    ) : (
                      <FaRegStar key={i} className="star" />
                    )
                  )}
                </div>

                <div className="rating-value">
                  {quickView.rating} Star Rating
                </div>

                <div className="feedback-count">
                  ({quickView.stock?.toLocaleString()} User feedback)
                </div>
              </div>

              <h2>{quickView.title}</h2>
              <p className="qv-desc">{quickView.description}</p>
              
              <div className="qv-meta-info">
                <div className="row-line">
                  <span className="key">SKU:</span>
                  <span className="value">{quickView.sku || "N/A"}</span>

                  <span className="divider">•</span>

                  <span className="key">Availability:</span>
                  <span
                    className={`value ${
                      quickView.stock > 0 ? "in-stock" : "out-stock"
                    }`}
                  >
                    {quickView.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <div className="row-line">
                  <span className="key">Brand:</span>
                  <span className="value">{quickView.brand || "Unknown"}</span>

                  <span className="divider">•</span>

                  <span className="key">Category:</span>
                  <span className="value">{quickView.category}</span>
                </div>
              </div>

              <div className="qv-meta">
                <div className="qv-price">${quickView.price}</div>

                {quickView.discountPercentage > 0 && (
                  <span className="badge discount qv-badge">
                    {Math.round(quickView.discountPercentage)}% OFF
                  </span>
                )}
              </div>

              <div className="qv-actions">
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
                  onClick={() => {
                    addToCart(quickView, qty);
                    closeQuickView();
                  }}
                >
                  Add to Cart <FiShoppingCart />
                </button>
                
                <button
                  className="btn-secondary"
                  onClick={() => {
                    addToCart(quickView, qty);
                    closeQuickView();
                    navigate("/cart");
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}