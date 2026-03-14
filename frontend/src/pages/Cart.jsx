import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Cart.css'

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="cart-empty page-enter">
        <div className="cart-empty-inner">
          <div className="cart-empty-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          </div>
          <p className="section-label">Your Cart</p>
          <h2>Nothing here yet</h2>
          <p>Discover our curated collections and add something beautiful.</p>
          <Link to="/vases" className="btn-filled">Start Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page page-enter">
      <div className="container">
        <div className="cart-header">
          <p className="section-label">Your Selection</p>
          <h1>Shopping Cart</h1>
        </div>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            {items.map(item => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-img">
                  {item.image
                    ? <img src={item.image} alt={item.name} />
                    : <div className="cart-item-placeholder" />
                  }
                </div>
                <div className="cart-item-info">
                  <p className="cart-item-category">{item.category}</p>
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                  <p className="cart-item-unit">${item.price?.toFixed(2)} each</p>
                </div>
                <div className="cart-item-controls">
                  <div className="cart-qty">
                    <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="cart-remove" onClick={() => removeFromCart(item._id)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14H6L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4h6v2"/>
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="cart-summary-lines">
              {items.map(item => (
                <div key={item._id} className="cart-summary-line">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="cart-summary-divider" />
            <div className="cart-summary-total">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn-filled" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
              Proceed to Checkout
            </Link>
            <Link to="/vases" className="btn-primary" style={{ display: 'block', textAlign: 'center', width: '100%', marginTop: '0.75rem' }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
