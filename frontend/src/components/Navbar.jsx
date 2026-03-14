import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const dropRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleProfileClick() {
    if (!user) {
      navigate('/login')
    } else {
      setProfileOpen(p => !p)
    }
  }

  function handleLogout() {
    logout()
    setProfileOpen(false)
    navigate('/')
  }

  const isAdmin = user?.role === 'administration'

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">Adorno</Link>

        <button className="hamburger" onClick={() => setMenuOpen(p => !p)}>
          <span /><span /><span />
        </button>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/all-products" onClick={() => setMenuOpen(false)}>Collections</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          {isAdmin && (
            <Link to="/admin" className="navbar-admin-link" onClick={() => setMenuOpen(false)}>
              Edit Products
            </Link>
          )}
        </div>

        <div className="navbar-actions">
          <Link to="/cart" className="cart-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          <div className="profile-wrapper" ref={dropRef}>
            <button className="profile-btn" onClick={handleProfileClick}>
              {user ? (
                <div className="profile-avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              )}
            </button>

            {profileOpen && user && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <p className="profile-name">{user.name}</p>
                  <p className="profile-email">{user.email}</p>
                </div>
                <div className="profile-divider" />
                <Link to="/orders" onClick={() => setProfileOpen(false)}>My Orders</Link>
                {isAdmin && <Link to="/admin" onClick={() => setProfileOpen(false)}>Admin Panel</Link>}
                <button onClick={handleLogout}>Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
