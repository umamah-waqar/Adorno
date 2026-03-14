import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Checkout.css'

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const { token } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    contactnum: '',
    address: '',
    cod: false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  if (items.length === 0 && !success) {
    return (
      <div className="checkout-empty page-enter">
        <p>Your cart is empty.</p>
        <Link to="/vases" className="btn-filled">Shop Now</Link>
      </div>
    )
  }

  async function handlePlaceOrder(e) {
    e.preventDefault()
    if (!form.cod) {
      setError('Please select Cash on Delivery to continue.')
      return
    }
    setError('')
    setLoading(true)

    const payload = {
      products: items.map(i => ({ productId: i._id, quantity: i.quantity })),
      totalPrice,
      email: form.email,
      contactnum: form.contactnum,
      address: form.address,
      paymentMethod: 'Cash on Delivery',
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Order failed')
      clearCart()
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="checkout-success page-enter">
        <div className="success-card">
          <div className="success-icon">✓</div>
          <p className="section-label" style={{ color: 'var(--terracotta)' }}>Order Confirmed</p>
          <h2>Your order has been placed successfully!</h2>
          <p>We'll prepare your items with care. Thank you for choosing Adorno.</p>
          <div className="success-actions">
            <Link to="/orders" className="btn-filled">View My Orders</Link>
            <Link to="/" className="btn-primary">Back to Home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page page-enter">
      <div className="container">
        <div className="checkout-header">
          <p className="section-label">Almost there</p>
          <h1>Checkout</h1>
        </div>

        <div className="checkout-layout">
          {/* Form */}
          <form className="checkout-form" onSubmit={handlePlaceOrder}>
            <div className="checkout-section">
              <h3>Delivery Details</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="hello@example.com"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contact Number</label>
                  <input
                    type="tel"
                    placeholder="+92 300 0000000"
                    value={form.contactnum}
                    onChange={e => setForm(p => ({ ...p, contactnum: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Delivery Address</label>
                <textarea
                  placeholder="Street, City, Country"
                  value={form.address}
                  onChange={e => setForm(p => ({ ...p, address: e.target.value }))}
                  required
                  rows={3}
                />
              </div>
            </div>

            <div className="checkout-section">
              <h3>Payment Method</h3>
              <label className="cod-label">
                <input
                  type="checkbox"
                  checked={form.cod}
                  onChange={e => setForm(p => ({ ...p, cod: e.target.checked }))}
                />
                <div className="cod-content">
                  <span className="cod-title">Cash on Delivery</span>
                  <span className="cod-desc">Pay when your order arrives at your door.</span>
                </div>
              </label>
            </div>

            {error && <div className="checkout-error">{error}</div>}

            <button type="submit" className="btn-filled checkout-submit" disabled={loading}>
              {loading ? 'Placing Order…' : `Place Order — RS${totalPrice.toFixed(2)}`}
            </button>
          </form>

          {/* Order summary */}
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="checkout-items">
              {items.map(item => (
                <div key={item._id} className="checkout-item">
                  <div className="checkout-item-img">
                    {item.image
                      ? <img src={item.image} alt={item.name} />
                      : <div className="checkout-item-placeholder" />
                    }
                    <span className="checkout-item-qty">{item.quantity}</span>
                  </div>
                  <div className="checkout-item-info">
                    <p>{item.name}</p>
                    <p className="checkout-item-cat">{item.category}</p>
                  </div>
                  <span className="checkout-item-price">
                    RS{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="checkout-totals">
              <div className="checkout-total-row">
                <span>Subtotal</span>
                <span>RS{totalPrice.toFixed(2)}</span>
              </div>
              <div className="checkout-total-row">
                <span>Delivery</span>
                <span>{totalPrice >= 79 ? 'Free' : 'RS9.00'}</span>
              </div>
              <div className="checkout-total-row total">
                <span>Total</span>
                <span>RS{(totalPrice >= 79 ? totalPrice : totalPrice + 9).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
