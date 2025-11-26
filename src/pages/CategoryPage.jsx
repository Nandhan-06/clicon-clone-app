import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import axios from "axios";
import "../components/CategoryPage.css";

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://dummyjson.com/products/category/${category}`
        );
        setProducts(res.data.products);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  const formatCategoryName = (cat) => {
    return cat
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="category-page">
      <div className="category-header">
        <button onClick={() => navigate("/")} className="back-btn">
          ← Back to Home
        </button>
        <h1>{formatCategoryName(category)}</h1>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <div className="product-img-wrap">
              <img src={product.thumbnail} alt={product.title} />

              <div className="product-icons">
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
              </div>
            </div>

            <h3>{product.title}</h3>
            <p className="price">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
