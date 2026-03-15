import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import '../pages/CategoryPage.css'
import './AllProducts.css'
const API_BASE_URL = import.meta.env.VITE_API_URL || '';


const CATEGORIES = ['all', 'vases', 'candles', 'lamps']

export default function AllProducts() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      .then(r => r.json())
      .then(data => {
        const all = Array.isArray(data) ? data : data.products || []
        setProducts(all)
        setFiltered(all)
      })
      .catch(() => setError('Failed to load products.'))
      .finally(() => setLoading(false))
  }, [])

  function handleFilter(cat) {
    setActiveFilter(cat)
    if (cat === 'all') {
      setFiltered(products)
    } else {
      setFiltered(products.filter(p => p.category?.toLowerCase() === cat))
    }
  }

  return (
    <div className="category-page page-enter">
      {/* Hero Banner */}
      <div className="category-hero allproducts-hero">
        <div className="category-hero-bg allproducts-hero-bg" />
        <div className="category-hero-content">
          {/* <p className="section-label" style={{ color: 'rgba(253,250,247,0.65)' }}>The Full Edit</p> */}
          <h1>All Collections</h1>
          <p>Every piece we carry, curated for quiet, considered living.</p>
        </div>
        <div className="category-hero-icon" style={{ fontSize: '7rem' }}>✦</div>
      </div>

      {/* Filter Bar */}
      <div className="allproducts-filters">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => handleFilter(cat)}
          >
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="category-body container">
        {loading && (
          <div className="category-loading">
            <div className="loading-dots">
              <span /><span /><span />
            </div>
            <p>Loading collection…</p>
          </div>
        )}

        {error && <div className="category-error">{error}</div>}

        {!loading && !error && filtered.length === 0 && (
          <div className="category-empty">
            <p className="section-label">Nothing here yet</p>
            <h3>No products found</h3>
            <p>We're curating something beautiful. Check back soon.</p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <>
            <p className="category-count">
              {filtered.length} item{filtered.length !== 1 ? 's' : ''}
              {activeFilter !== 'all' && ` in ${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}`}
            </p>
            <div className="products-grid">
              {filtered.map(p => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
