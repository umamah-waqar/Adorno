import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Admin.css'

const EMPTY_FORM = {
  name: '', description: '', price: '', category: 'vases', image: '', stock: ''
}

const CATEGORIES = ['vases', 'candles', 'lamps']

export default function Admin() {
  const { user, token } = useAuth()
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('list') // list | add | edit
  const [editProduct, setEditProduct] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState({ type: '', text: '' })
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => {
    if (!user || user.role !== 'administration') {
      navigate('/')
      return
    }
    fetchProducts()
  }, [user])

  async function fetchProducts() {
    setLoading(true)
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(Array.isArray(data) ? data : data.products || [])
    } catch {
      setMsg({ type: 'error', text: 'Failed to load products.' })
    } finally {
      setLoading(false)
    }
  }

  function startAdd() {
    setForm(EMPTY_FORM)
    setEditProduct(null)
    setMsg({ type: '', text: '' })
    setView('add')
  }

  function startEdit(product) {
    setForm({
      name: product.name || '',
      description: product.description || '',
      price: product.price || '',
      category: product.category || 'vases',
      image: product.image || '',
      stock: product.stock ?? '',
    })
    setEditProduct(product)
    setMsg({ type: '', text: '' })
    setView('edit')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setMsg({ type: '', text: '' })

    const payload = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
    }

    try {
      const isEdit = view === 'edit' && editProduct
      const url = isEdit ? `/api/products/${editProduct._id}` : '/api/products'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed')

      setMsg({ type: 'success', text: isEdit ? 'Product updated.' : 'Product added.' })
      fetchProducts()
      setTimeout(() => setView('list'), 1000)
    } catch (err) {
      setMsg({ type: 'error', text: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Delete failed')
      setDeleteConfirm(null)
      setMsg({ type: 'success', text: 'Product deleted.' })
      fetchProducts()
    } catch (err) {
      setMsg({ type: 'error', text: err.message })
    }
  }

  return (
    <div className="admin-page page-enter">
      <div className="admin-sidebar">
        <p className="admin-brand">Adorno</p>
        <p className="admin-label">Admin Panel</p>
        <nav className="admin-nav">
          <button
            className={view === 'list' ? 'active' : ''}
            onClick={() => { setView('list'); setMsg({ type: '', text: '' }) }}
          >
            All Products
          </button>
          <button
            className={view === 'add' ? 'active' : ''}
            onClick={startAdd}
          >
            + Add Product
          </button>
        </nav>
      </div>

      <div className="admin-main">
        {/* Header */}
        <div className="admin-topbar">
          <h1>
            {view === 'list' ? 'All Products' : view === 'add' ? 'Add Product' : 'Edit Product'}
          </h1>
          {view === 'list' && (
            <button className="btn-filled" onClick={startAdd}>+ Add Product</button>
          )}
          {(view === 'add' || view === 'edit') && (
            <button className="btn-primary" onClick={() => setView('list')}>← Back</button>
          )}
        </div>

        {msg.text && (
          <div className={`admin-msg ${msg.type}`}>{msg.text}</div>
        )}

        {/* Product List */}
        {view === 'list' && (
          <div className="admin-list">
            {loading && (
              <div className="admin-loading">
                <div className="loading-dots"><span /><span /><span /></div>
              </div>
            )}
            {!loading && products.length === 0 && (
              <div className="admin-empty">
                <p>No products yet. Add your first one.</p>
                <button className="btn-filled" onClick={startAdd}>Add Product</button>
              </div>
            )}
            {!loading && products.map(p => (
              <div key={p._id} className="admin-product-row">
                <div className="admin-product-img">
                  {p.image
                    ? <img src={p.image} alt={p.name} />
                    : <div className="admin-product-placeholder" />
                  }
                </div>
                <div className="admin-product-info">
                  <p className="admin-product-name">{p.name}</p>
                  <p className="admin-product-cat">{p.category}</p>
                </div>
                <p className="admin-product-price">${p.price?.toFixed(2)}</p>
                <p className="admin-product-stock">Stock: {p.stock ?? '—'}</p>
                <div className="admin-product-actions">
                  <button className="btn-primary" onClick={() => startEdit(p)}>Edit</button>
                  <button className="btn-delete" onClick={() => setDeleteConfirm(p)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add / Edit Form */}
        {(view === 'add' || view === 'edit') && (
          <form className="admin-form" onSubmit={handleSubmit}>
            <div className="admin-form-grid">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Terracotta Arch Vase"
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Price ($)</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Stock</label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={e => setForm(p => ({ ...p, stock: e.target.value }))}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div className="form-group form-full">
                <label>Image URL</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={e => setForm(p => ({ ...p, image: e.target.value }))}
                  placeholder="https://..."
                />
              </div>

              <div className="form-group form-full">
                <label>Description</label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                  placeholder="Describe the product…"
                  rows={4}
                  required
                />
              </div>
            </div>

            {form.image && (
              <div className="admin-img-preview">
                <img src={form.image} alt="Preview" onError={e => e.target.style.display = 'none'} />
              </div>
            )}

            <div className="admin-form-actions">
              <button type="submit" className="btn-filled" disabled={submitting}>
                {submitting ? 'Saving…' : view === 'edit' ? 'Update Product' : 'Add Product'}
              </button>
              <button type="button" className="btn-primary" onClick={() => setView('list')}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="delete-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="delete-modal" onClick={e => e.stopPropagation()}>
            <h3>Delete Product</h3>
            <p>Are you sure you want to delete <strong>{deleteConfirm.name}</strong>? This cannot be undone.</p>
            <div className="delete-modal-actions">
              <button className="btn-delete" onClick={() => handleDelete(deleteConfirm._id)}>
                Yes, Delete
              </button>
              <button className="btn-primary" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
