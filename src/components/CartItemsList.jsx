import { useCart } from "../context/CartContext";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./CartItemsList.css";

export default function CartItemsList({ setPage }) {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-container">
      <h3 className="cart-title">Shopping Cart</h3>

      <div className="cart-header">
        <div></div>
        <div>Product</div>
        <div>Price</div>
        <div>Quantity</div>
        <div>Subtotal</div>
      </div>

      {cartItems.length === 0 && (
        <div className="cart-empty">Cart is empty.</div>
      )}

      {cartItems.map((item) => (
        <div className="cart-row" key={item.id}>
          <button
            className="remove-btn"
            onClick={() => removeFromCart(item.id)}
          >
            X
          </button>

          <div className="product-info">
            <img src={item.thumbnail} alt={item.title} />
            <span>{item.title}</span>
          </div>

          <div className="cell">${item.price}</div>

          <div className="qty-box">
            <button
              disabled={item.quantity <= 1}
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <FaMinus />
            </button>

            <span>{String(item.quantity).padStart(2, "0")}</span>

            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              <FaPlus />
            </button>
          </div>

          <div className="cell">${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      ))}

      <div className="cart-actions">
        <button className="outline-btn" onClick={() => setPage("home")}>
          ⬅ RETURN TO SHOP
        </button>

        <button className="outline-btn" onClick={() => alert("Cart Updated!")}>
          UPDATE CART
        </button>
      </div>
    </div>
  );
}
