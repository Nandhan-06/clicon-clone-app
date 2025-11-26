//Carousel.jsx
import { useEffect, useState, useRef } from "react";
import "./Carousel.css";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const allowedCategories = [
  "smartphones",
  "laptops",
  "mens-watches",
  "womens-watches",
  "tablets",
  "mobile-accessories",
];

export default function Carousel() {
  const [products, setProducts] = useState([]);
  const [position, setPosition] = useState(0);
  const navigate = useNavigate();

  const visibleCards = 6;
  const cardWidth = 170;
  const trackRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let allProducts = [];

        for (const category of allowedCategories) {
          const res = await axios.get(
            `https://dummyjson.com/products/category/${category}`
          );
          allProducts.push(...res.data.products);
        }

        // Filter to ensure max 2 products per category
        const selectedProducts = [];
        const categoryCount = {};

        // Initialize category counts
        allowedCategories.forEach((cat) => {
          categoryCount[cat] = 0;
        });

        // Shuffle all products first
        const shuffled = [...allProducts].sort(() => Math.random() - 0.5);

        // Select products ensuring max 2 per category
        for (const product of shuffled) {
          if (selectedProducts.length >= 12) break;

          if (categoryCount[product.category] < 2) {
            selectedProducts.push(product);
            categoryCount[product.category]++;
          }
        }

        setProducts(selectedProducts);
      } catch (error) {
        console.error("Error fetching carousel products", error);
      }
    };

    fetchProducts();
  }, []);

  // Double the products to fake infinite loop
  const looped = [...products, ...products];

  const totalCards = looped.length;
  const maxShift = -(totalCards * cardWidth - visibleCards * cardWidth);

  const moveNext = () => {
    setPosition((prev) => {
      const newPos = prev - cardWidth;

      // If we have passed half, reset back without animation
      if (newPos <= maxShift) {
        setTimeout(() => {
          trackRef.current.style.transition = "none";
          setPosition(0);
          setTimeout(() => {
            trackRef.current.style.transition = "transform 0.4s ease";
          }, 10);
        }, 400);

        return newPos;
      }

      return newPos;
    });
  };

  const movePrev = () => {
    setPosition((prev) => {
      const newPos = prev + cardWidth;

      // If user goes left before 0, jump to the middle
      if (newPos > 0) {
        setTimeout(() => {
          trackRef.current.style.transition = "none";
          setPosition(maxShift);
          setTimeout(() => {
            trackRef.current.style.transition = "transform 0.4s ease";
          }, 10);
        }, 400);

        return newPos;
      }

      return newPos;
    });
  };

  // Format category name for display
  const formatCategoryName = (category) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Handle click on product card
  const handleCardClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-heading">
        <p className="heading">Shop with Categorys</p>
      </div>

      <div className="carousel-box">
        <button className="carousel-btn prev" onClick={movePrev}>
          <FaArrowLeftLong />
        </button>

        <div
          className="carousel-track"
          ref={trackRef}
          style={{
            transform: `translateX(${position}px)`,
            transition: "transform 0.4s ease",
          }}
        >
          {looped.map((p, index) => (
            <div
              key={index}
              className="product-card"
              onClick={() => handleCardClick(p.category)}
              style={{ cursor: "pointer" }}
            >
              <img src={p.thumbnail} alt={p.title} />
              <h4>{formatCategoryName(p.category)}</h4>
            </div>
          ))}
        </div>

        <button className="carousel-btn next" onClick={moveNext}>
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
}