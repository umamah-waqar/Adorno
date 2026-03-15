import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import './CategoryPage.css'
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const CATEGORY_META = {
  vases: {
    title: 'Vases',
    label: 'Ceramic & Glass',
    desc: 'Handcrafted vessels that bring quiet beauty to any shelf, table, or corner of your home.',
    emoji: '🏺',
  },
  candles: {
    title: 'Candles',
    label: 'Scent & Light',
    desc: 'Soy-wax candles hand-poured in small batches. Every scent tells a story.',
    emoji: '🕯️',
  },
  lamps: {
    title: 'Lamps',
    label: 'Sculptural Lighting',
    desc: 'Lighting that doubles as an art object — warm, considered, and quietly stunning.',
    emoji: '💡',
  },
}

export default function CategoryPage({ category: propCategory }) {
  const params = useParams()
  const category = propCategory || params.category
  const meta = CATEGORY_META[category] || { title: category, label: '', desc: '' }

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch(`${API_BASE_URL}/api/products`)
      .then(r => r.json())
      .then(data => {
        const all = Array.isArray(data) ? data : data.products || []
        setProducts(all.filter(p => p.category?.toLowerCase() === category.toLowerCase()))
      })
      .catch(() => setError('Failed to load products.'))
      .finally(() => setLoading(false))
  }, [category])

  return (
    <div className="category-page page-enter">
      {/* Hero Banner */}
      <div className="category-hero">
        <div className="category-hero-bg" />
        <div className="category-hero-content">
          <p className="section-label" style={{ color: 'rgba(253,250,247,0.65)' }}>{meta.label}</p>
          <h1>{meta.title}</h1>
          <p>{meta.desc}</p>
        </div>
        <div className="category-hero-icon">{meta.emoji}</div>
      </div>

      {/* Products Grid */}
      <div className="category-body container">
        {loading && (
          <div className="category-loading">
            <div className="loading-dots">
              <span /><span /><span />
            </div>
            <p>Loading {meta.title}…</p>
          </div>
        )}

        {error && <div className="category-error">{error}</div>}

        {!loading && !error && products.length === 0 && (
          <div className="category-empty">
            <p className="section-label">Coming Soon</p>
            <h3>No {meta.title} yet</h3>
            <p>We're curating something beautiful. Check back soon.</p>
          </div>
        )}

        {!loading && products.length > 0 && (
          <>
            <p className="category-count">{products.length} item{products.length !== 1 ? 's' : ''}</p>
            <div className="products-grid">
              {products.map(p => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
