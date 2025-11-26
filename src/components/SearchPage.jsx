import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import { FiShoppingCart, FiHeart } from "react-icons/fi";

export default function SearchPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const results = state?.results || [];
  const query = state?.query || "";

  return (
    <>
      <Header />
      
      <div style={{ padding: "40px 20px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "8px" }}>
            Search Results for "{query}"
          </h2>
          <p style={{ color: "#6B7280", fontSize: "16px" }}>
            {results.length} {results.length === 1 ? "product" : "products"} found
          </p>
        </div>

        {results.length === 0 ? (
          <div style={{ 
            textAlign: "center", 
            padding: "60px 20px",
            background: "#F9FAFB",
            borderRadius: "8px"
          }}>
            <h3 style={{ fontSize: "20px", color: "#6B7280", marginBottom: "12px" }}>
              No products found
            </h3>
            <p style={{ color: "#9CA3AF", marginBottom: "24px" }}>
              Try searching with different keywords
            </p>
            <button
              onClick={() => navigate("/")}
              style={{
                padding: "12px 24px",
                background: "#FF8A3D",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500"
              }}
            >
              Back to Home
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {results.map((product) => (
              <article
                key={product.id}
                style={{
                  border: "1px solid #E5E7EB",
                  padding: "16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  background: "white",
                  transition: "all 0.3s ease",
                  position: "relative"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                  const actions = e.currentTarget.querySelector(".product-actions");
                  if (actions) actions.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  const actions = e.currentTarget.querySelector(".product-actions");
                  if (actions) actions.style.opacity = "0";
                }}
              >
                {/* Hover Actions */}
                <div 
                  className="product-actions"
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    zIndex: 2
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("Added to wishlist");
                    }}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "none",
                      background: "white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <FiHeart size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, 1);
                    }}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      border: "none",
                      background: "#FF8A3D",
                      color: "white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <FiShoppingCart size={16} />
                  </button>
                </div>

                {/* Product Image */}
                <div style={{
                  height: "200px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "12px"
                }}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "contain" 
                    }}
                  />
                </div>

                {/* Product Info */}
                <div>
                  <h4 style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    margin: "0 0 8px 0",
                    color: "#111827",
                    lineHeight: "1.4"
                  }}>
                    {product.title}
                  </h4>

                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px"
                  }}>
                    <span style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#111827"
                    }}>
                      ${product.price}
                    </span>
                    <span style={{ 
                      color: "#FCD34D", 
                      fontSize: "14px" 
                    }}>
                      ★ {product.rating?.toFixed(1)}
                    </span>
                  </div>

                  {product.discountPercentage > 0 && (
                    <div style={{
                      background: "#FEF3C7",
                      color: "#92400E",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "600",
                      display: "inline-block"
                    }}>
                      {Math.round(product.discountPercentage)}% OFF
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}