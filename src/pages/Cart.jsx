import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Breadcrump from "../components/Breadcrump";
import CartItemsList from "../components/CartItemsList";
import CheckoutSummary from "../components/CheckoutSummary";
import Footer from "../components/Footer";

export default function Cart() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <>
      <Header
        showTopBanner={false}
        showSocialStrip={false}
        showNav={true}
      />

      {/* Back Button */}
      <div className="back-button-container">
        <button onClick={goToHome} className="back-button">
          ← Back to Home
        </button>
      </div>

      <Breadcrump />

      <div className="cart-container">
        <CartItemsList />
        <CheckoutSummary />
      </div>

      <Footer />
    </>
  );
}
