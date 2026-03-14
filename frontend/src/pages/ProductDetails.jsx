import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './ProductDetails.css'

export default function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(r => r.json())
      .then(data => setProduct(data))
      .catch(() => setError('Product not found.'))
      .finally(() => setLoading(false))
  }, [id])

  function handleAddToCart() {
    if (!user) {
      navigate('/login')
      return
    }
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) return (
    <div className="pd-loading page-enter">
      <div className="loading-dots"><span /><span /><span /></div>
    </div>
  )

  if (error || !product) return (
    <div className="pd-error page-enter">
      <p>{error || 'Product not found.'}</p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  )

  return (
    <div className="pd-page page-enter">
      <div className="pd-breadcrumb container">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to={`/${product.category?.toLowerCase()}`}>{product.category}</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="pd-layout container">
        {/* Image */}
        <div className="pd-image-side">
          <div className="pd-image-wrap">
            {product.image ? (
              <img src={product.image} alt={product.name} />
            ) : (
              <div className="pd-image-placeholder">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="pd-info-side">
          <p className="section-label">{product.category}</p>
          <h1 className="pd-name">{product.name}</h1>
          <p className="pd-price">RS{product.price?.toFixed(2)}</p>

          {product.stock !== undefined && (
            <p className="pd-stock">
              {product.stock > 0
                ? <span className="in-stock">✓ In Stock ({product.stock} available)</span>
                : <span className="out-stock">Out of Stock</span>}
            </p>
          )}

          <p className="pd-desc">{product.description}</p>

          <div className="pd-actions">
            <div className="pd-qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
            <button
              className={`btn-filled pd-add-btn ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
          </div>

          <Link to="/cart" className="btn-primary pd-cart-link">View Cart</Link>

          <div className="pd-meta">
            <p><strong>Category:</strong> {product.category}</p>
            {product.stock !== undefined && <p><strong>Stock:</strong> {product.stock}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
