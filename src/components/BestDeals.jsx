import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import axios from "axios";
import DealTimer from "./DealTimer";
import { FaStar, FaRegStar } from "react-icons/fa";
import "./BestDeals.css";


function groupByCategory(products) {
  return products.reduce((groups, product) => {
    const cat = product.category || "others";
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(product);
    return groups;
  }, {});
}

const allowedCategories = [
  "smartphones",
  "laptops",
  "mens-watches",
  "womens-watches",
  "tablets",
  "mobile-accessories",
];

function shuffleArr(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function BestDeals() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quickView, setQuickView] = useState(null);
  const [qty, setQty] = useState(1);

  const { addToCart } = useCart();

 
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/products?limit=100")
      .then((res) => {
        const products = res.data.products || [];
        const pool = products.filter((p) =>
          allowedCategories.includes(p.category)
        );
        setAllProducts(pool);
        setLoading(false);
      })
      .catch(() => {
        setAllProducts([]);
        setLoading(false);
      });
  }, []);

 
  useEffect(() => {
    if (!allProducts.length) {
      setDisplayProducts([]);
      return;
    }

    const pool = shuffleArr(allProducts);

    let first =
      pool.find(
        (p) =>
          p.rating >= 4.7 &&
          p.discountPercentage &&
          Math.abs(p.discountPercentage - 30) <= 6
      ) ||
      [...pool].sort((a, b) => {
        const aDist = Math.abs((a.discountPercentage || 0) - 30);
        const bDist = Math.abs((b.discountPercentage || 0) - 30);
        if (a.rating === b.rating) return aDist - bDist;
        return b.rating - a.rating;
      })[0];

   
    let second = pool.find((p) => p.stock === 0 && p.id !== first.id) || null;

    let soldFallback = false;
    if (!second) {
      second = pool.find((p) => p.id !== first.id);
      soldFallback = true;
    }

    const chosen = [];
    if (first) chosen.push({ ...first });
    if (second)
      chosen.push({ ...second, forcedSold: soldFallback ? true : false });

    const remainingPool = pool.filter(
      (p) => !chosen.some((c) => c.id === p.id)
    );

    const highPriority = remainingPool.filter(
      (p) =>
        (p.discountPercentage && p.discountPercentage >= 20) || p.rating >= 4.5
    );

    const rest = remainingPool.filter((p) => !highPriority.includes(p));

    const needed = 9 - chosen.length;
    const extra = [...highPriority.slice(0, 3), ...rest.slice(0, needed)];
    const final = [...chosen, ...extra].slice(0, 9);

    const firstTile = final[0];
    const others = shuffleArr(final.slice(1));

    setDisplayProducts([firstTile, ...others]);
  }, [allProducts]);

  const openQuickView = (product) => setQuickView(product);
  const closeQuickView = () => setQuickView(null);

  const placeholder =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='#f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-size='20'>Image not available</text></svg>`
    );

  return (
    <section className="best-deals">
      <div className="best-deals-header">
        <div className="best-left">
          <h2>Best Deals</h2>
          <span className="deals-text">Deals ends in</span>
          <span className="deals-timer-text"><DealTimer targetDate={new Date("2025-12-01").getTime()} /></span>
          
        </div>

        <button className="browse-btn" onClick={() => setShowAll((s) => !s)}>
          {showAll ? "Show Less" : "Browse All Product"} →
        </button>
      </div>

      <div className="best-deal-body">
        {loading ? (
          <div className="loading">Loading products…</div>
        ) : !showAll ? (
          <div className="deals-grid">
            {displayProducts.map((item, index) => {
              const isSold =
                (item.forcedSold && item.forcedSold === true) ||
                item.stock === 0;

              const hasDiscount =
                item.discountPercentage && item.discountPercentage > 0;

              const discountText = hasDiscount
                ? `${Math.round(item.discountPercentage)}% OFF`
                : null;

              const isFirst = index === 0;

              return (
                <article
                  key={item.id + "-" + index}
                  className={`deal-card ${isFirst ? "big-tile" : ""}`}
                  onClick={() => openQuickView(item)}
                >
                  {/* Badges */}
                  <div className="badge-container">
                    {hasDiscount && (
                      <span className="badge discount">{discountText}</span>
                    )}
                    {isSold ? (
                      <span className="badge sold">SOLD OUT</span>
                    ) : (
                      !hasDiscount && <span className="badge hot">HOT</span>
                    )}
                  </div>

                  <div className="img-wrap">
                    <img src={item.thumbnail || placeholder} alt={item.title} />
                  </div>

                  <div className="deal-info">
                    <h3>{item.title}</h3>

                    {isFirst && (
                      <>
                        <div className="rating">
                          <span className="stars-yellow">
                            {"★".repeat(Math.round(item.rating))}
                          </span>
                          <span className="rating-num">
                            ({item.rating?.toFixed(1)})
                          </span>
                        </div>
                        {/* <p className="short-desc">
                          {item.description?.slice(0, 120)}
                        </p> */}
                      </>
                    )}

                    <div className="meta">
                      <div className="price-section">
                        {item.discountPercentage > 0 && (
                          <span className="old-price">
                            $
                            {(
                              item.price /
                              (1 - item.discountPercentage / 100)
                            ).toFixed(2)}
                          </span>
                        )}
                        <span className="price">${item.price}</span>
                      </div>
                    </div>

                    {isFirst && (
                      <div className="big-tile-actions">
                        <button
                          className="icon-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            alert("Added to wishlist (demo)");
                          }}
                        >
                          <FiHeart />
                        </button>

                        <button
                          className="add-to-cart-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(item, 1);
                          }}
                        >
                          <FiShoppingCart /> ADD TO CARD
                        </button>

                        <button
                          className="icon-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            openQuickView(item);
                          }}
                        >
                          <FiEye />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Hover icons for non-first cards */}
                  {!isFirst && (
                    <div className="deal-card-icons">
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
                          addToCart(item, 1);
                        }}
                      >
                        <FiShoppingCart />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openQuickView(item);
                        }}
                      >
                        <FiEye />
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          Object.entries(groupByCategory(allProducts)).map(
            ([category, products]) => (
              <div key={category} className="category-block">
                <h2 className="cat-title">
                  {category.replace("-", " ").toUpperCase()}
                </h2>

                <div className="browse-grid">
                  {products.map((item) => (
                    <article
                      key={item.id}
                      className="deal-card"
                      onClick={() => openQuickView(item)}
                    >
                      <div className="img-wrap">
                        <img
                          src={item.thumbnail || placeholder}
                          alt={item.title}
                        />
                      </div>

                      <div className="deal-info">
                        <h3>{item.title}</h3>

                        <div className="meta">
                          <span className="price">${item.price}</span>
                          <span className="rating">
                            ★ {item.rating?.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )
          )
        )}
      </div>

      QuickView Modal
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

                  <span className="divider"></span>

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
                  onClick={() => addToCart(quickView, qty)}
                >
                  Add to Cart <FiShoppingCart />
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => navigate("/cart")}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
