import { useCart } from "../context/CartContext";

export default function CheckoutSummary() {
  const { subtotal, tax, shipping, discount, total } = useCart();

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #ddd",
        padding: "20px",
        width: "30%",
        minHeight: "300px",
        color: "black",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: "20px" }}>Cart Totals</h3>

      <p
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "20px",
          color: "#5F6C72",
        }}
      >
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </p>

      <p
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "20px",
          color: "#5F6C72",
        }}
      >
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </p>

      <p
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "20px",
          color: "#5F6C72",
        }}
      >
        <span>Tax (10%)</span>
        <span>${tax.toFixed(2)}</span>
      </p>

      <p
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "20px",
          color: "#5F6C72",
        }}
      >
        <span>Discount</span>
        <span>-${discount.toFixed(2)}</span>
      </p>

      <h3
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 600,
          fontSize: "16px",
          color: "black",
        }}
      >
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </h3>

      <button
        style={{
          width: "100%",
          padding: "12px",
          background: "#FA8232",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        PROCEED TO CHECKOUT
      </button>
    </div>
  );
}
