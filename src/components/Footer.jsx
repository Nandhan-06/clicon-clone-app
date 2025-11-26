import './Footer.css';
import {
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">

          <div className="logo-column">
            <h1>CLICON</h1>
            <p className="text-gray-400">Customer Supports:</p>
            <p className="text-size-one">(629) 555-0129</p>
            <p className="text-gray-400">4517 Washington Ave. Manchester, Kentucky 39495</p>
            <p className="text-size-two">info@kinbo.com</p>
          </div>

          <div className="logo-column">
            <p>Top Category</p>
            <ul>
              <li><a href="#">Computer & Laptop</a></li>
              <li><a href="#">SmartPhone</a></li>
              <li><a href="#">Headphone</a></li>
              <li><a href="#"><span>---</span>Accessories</a></li>
              <li><a href="#">Camera & Photo</a></li>
              <li><a href="#">TV & Homes</a></li>
              <li className="browse-footer"><a href ="" >Browse all products <FaArrowRightLong style={{ cursor: "pointer", fontSize:"16px" }} /></a>
              </li>
            </ul>
          </div>
          <div className="logo-column">
            <p>Quick links</p>
            <ul>
              <li><a href="#">Shop Product</a></li>
              <li><a href="#">Shopping Cart</a></li>
              <li><a href="#">Wishlist</a></li>
              <li><a href="#">Compare</a></li>
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Customer Help</a></li>
              <li><a href="#">About Us</a></li>
            </ul>
          </div>
          <div className="logo-column">
            <p>Download APP</p>
            <div className='app-store-box'><FaGooglePlay style={{ cursor: "pointer", fontSize:"32px" }} /><div className='store'><p>Get it now</p>Google Play</div></div>
            <div className='app-store-box'><FaApple style={{ cursor: "pointer", fontSize:"32px" }} /><div className='store'><p>Get it now</p>App Store</div></div>
          </div>
          <div className="logo-column">
            <p>Popular Tags</p>
            <div className="grid-footer">
              <ul>
                  <li><div className="grid-box"><a href="#">Game</a></div></li>
                  <li><div className="grid-box"><a href="#">iPhone</a></div></li>
                  <li><div className="grid-box"><a href="#">TV</a></div></li>
                  <li><div className="grid-box"><a href="#">Asus Laptops</a></div></li>
                  <li><div className="grid-box"><a href="#">Macbook</a></div></li>
                  <li><div className="grid-box"><a href="#">SSD</a></div></li>
                  <li><div className="grid-box"><a href="#">Graphics Card</a></div></li>
                  <li><div className="grid-box"><a href="#">Power Bank</a></div></li>
                  <li><div className="grid-box"><a href="#">Smart TV</a></div></li>
                  <li><div className="grid-box"><a href="#">Speaker</a></div></li>
                  <li><div className="grid-box"><a href="#">Tablet</a></div></li>
                  <li><div className="grid-box"><a href="#">Microwave</a></div></li>
                  <li><div className="grid-box"><a href="#">Samsung</a></div></li>
              
            </ul>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
