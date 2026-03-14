import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './MyOrders.css'

const STATUS_COLOR = {
  pending:    { bg: '#fef3cd', color: '#856404' },
  processing: { bg: '#cce5ff', color: '#004085' },
  shipped:    { bg: '#d4edda', color: '#155724' },
  delivered:  { bg: '#d1ecf1', color: '#0c5460' },
  cancelled:  { bg: '#f8d7da', color: '#721c24' },
}

export default function MyOrders() {
  const { token, user } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetch('/api/orders/myorders', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => setOrders(Array.isArray(data) ? data : data.orders || []))
      .catch(() => setError('Failed to load orders.'))
      .finally(() => setLoading(false))
  }, [token, user])

  if (loading) return (
    <div className="orders-loading page-enter">
      <div className="loading-dots"><span /><span /><span /></div>
      <p>Loading your orders…</p>
    </div>
  )

  return (
    <div className="orders-page page-enter">
      <div className="container">
        <div className="orders-header">
          <p className="section-label">Your History</p>
          <h1>My Orders</h1>
        </div>

        {error && <div className="orders-error">{error}</div>}

        {!error && orders.length === 0 && (
          <div className="orders-empty">
            <p className="section-label">Nothing yet</p>
            <h3>No orders placed</h3>
            <p>When you place an order, it will appear here.</p>
            <Link to="/vases" className="btn-filled">Start Shopping</Link>
          </div>
        )}

        {orders.length > 0 && (
          <div className="orders-list">
            {orders.map((order, i) => {
              const st = order.status?.toLowerCase() || 'pending'
              const style = STATUS_COLOR[st] || STATUS_COLOR.pending
              return (
                <div key={order._id || i} className="order-card">
                  <div className="order-card-head">
                    <div className="order-id">
                      <p className="order-label">Order ID</p>
                      <p className="order-id-val">#{order._id?.slice(-8).toUpperCase() || `ORD-RS{i + 1}`}</p>
                    </div>
                    <div className="order-date">
                      <p className="order-label">Date</p>
                      <p>{order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</p>
                    </div>
                    <div className="order-total">
                      <p className="order-label">Total</p>
                      <p className="order-total-val">RS{order.totalPrice?.toFixed(2)}</p>
                    </div>
                    <span
                      className="order-status"
                      style={{ background: style.bg, color: style.color }}
                    >
                      {order.status || 'Pending'}
                    </span>
                  </div>

                  <div className="order-products">
                    {(order.products || []).map((item, j) => (
                      <div key={j} className="order-product">
                        <div className="order-product-img">
                          {item.productId?.image
                            ? <img src={item.productId.image} alt={item.productId.name} />
                            : <div className="order-product-placeholder" />
                          }
                        </div>
                        <div className="order-product-info">
                          <p>{item.productId?.name || 'Product'}</p>
                          <p className="order-product-qty">Qty: {item.quantity}</p>
                        </div>
                        {item.productId?.price && (
                          <span className="order-product-price">
                            RS{(item.productId.price * item.quantity).toFixed(2)}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="order-card-foot">
                    <span>Payment: {order.paymentMethod || 'Cash on Delivery'}</span>
                    {order.address && <span>Deliver to: {order.address}</span>}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
