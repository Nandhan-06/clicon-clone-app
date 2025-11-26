import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  const [toast, setToast] = useState(null);


  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);


  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

 
  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: qty }];
      }
    });

    setToast(`${product.title} added to cart`);
  };

 
  const removeFromCart = (id) => {
    const removed = cartItems.find((i) => i.id === id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setToast(`${removed?.title} removed from cart`);
  };


  const updateQuantity = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };


  const subtotal = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const tax = subtotal * 0.1;
  const shipping = subtotal > 500 ? 0 : 15;
  const discount = cartItems.length >= 3 ? subtotal * 0.05 : 0;

  const total = subtotal + tax + shipping - discount;

  const cartCount = cartItems.reduce((n, item) => n + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        subtotal,
        tax,
        shipping,
        discount,
        total,
        toast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}