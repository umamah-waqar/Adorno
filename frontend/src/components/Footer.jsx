import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="footer-logo">Adorno</p>
          <p className="footer-tagline">Artisan home décor that lasts.</p>
          <div className="footer-newsletter">
            <input type="email" placeholder="Email Address" />
            <button>Subscribe</button>
          </div>
        </div>

        <div className="footer-col">
          <h4>Info</h4>
          <p>+92 300 0000000</p>
          <p>hello@adorno.com</p>
          <p>Find a Store</p>
          <p>FAQ</p>
        </div>

        <div className="footer-col">
          <h4>Orders</h4>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">My Orders</Link>
          <p>Ordering & Payment</p>
          <p>Shipping</p>
          <p>Returns</p>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <p>About Us</p>
          <p>Work With Us</p>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>Press Enquiries</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Adorno. All rights reserved.</p>
        <div className="footer-socials">
          <span>Instagram</span>
          <span>Twitter</span>
          <span>Facebook</span>
        </div>
      </div>
    </footer>
  )
}
