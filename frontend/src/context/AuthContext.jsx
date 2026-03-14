import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('adorno_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      fetchProfile()
    } else {
      setLoading(false)
    }
  }, [token])

  async function fetchProfile() {
    try {
      const res = await fetch('/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setUser(data)
      } else {
        logout()
      }
    } catch {
      logout()
    } finally {
      setLoading(false)
    }
  }

  async function login(email, password) {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Login failed')
    localStorage.setItem('adorno_token', data.token)
    setToken(data.token)
    setUser(data.user || data)
    return data
  }

  async function register(name, email, password) {
    const res = await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Registration failed')
    localStorage.setItem('adorno_token', data.token)
    setToken(data.token)
    setUser(data.user || data)
    return data
  }

  function logout() {
    localStorage.removeItem('adorno_token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
