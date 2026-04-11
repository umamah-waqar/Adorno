import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'


export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
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
          <p className="section-label" style={{ color: 'rgba(253,250,247,0.6)' }}>Welcome back</p>
          <h2>Your space,<br /><em>your story.</em></h2>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-wrap">
          <Link to="/" className="auth-logo">Adorno</Link>
          <h1>Sign In</h1>
          <p className="auth-sub">New here? <Link to="/register">Create an account</Link></p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
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
              {loading ? 'Signing In…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
