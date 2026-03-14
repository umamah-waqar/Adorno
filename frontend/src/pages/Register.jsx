import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page page-enter">
      <div className="auth-visual">
        <div className="auth-arch" />
        <div className="auth-quote">
          <p className="section-label" style={{ color: 'rgba(253,250,247,0.6)' }}>Join us</p>
          <h2>Discover objects<br /><em>worth keeping.</em></h2>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-wrap">
          <Link to="/" className="auth-logo">Adorno</Link>
          <h1>Create Account</h1>
          <p className="auth-sub">Already have one? <Link to="/login">Sign in</Link></p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Your name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="hello@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="btn-filled" disabled={loading} style={{ width: '100%' }}>
              {loading ? 'Creating Account…' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
