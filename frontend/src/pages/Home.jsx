import { Link } from 'react-router-dom'
import './Home.css'

const SERVICES = [
  {
    title: 'Vases',
    path: '/vases',
    desc: 'Handcrafted ceramic and glass vases for every corner of your home.',
    emoji: '🏺'
  },
  {
    title: 'Candles',
    path: '/candles',
    desc: 'Scented soy candles that fill your space with warmth and calm.',
    emoji: '🕯️'
  },
  {
    title: 'Lamps',
    path: '/lamps',
    desc: 'Sculptural lighting that doubles as a work of art.',
    emoji: '💡'
  }
]

export default function Home() {
  return (
    <div className="home page-enter">

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-arch" />
        <div className="hero-content">
          <p className="section-label" style={{ color: 'rgba(253,250,247,0.7)' }}>Artisan Home Décor</p>
          <h1>Curated Objects<br /><em>for Quiet Spaces</em></h1>
          <p className="hero-sub">Free delivery on orders over $79</p>
          <Link to="/vases" className="btn-primary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.6)' }}>
            Shop Now
          </Link>
        </div>
        <div className="hero-vase-group">
          <div className="hero-vase vase-1" />
          <div className="hero-vase vase-2" />
          <div className="hero-vase vase-3" />
        </div>
        <div className="hero-footer-label">
          <span>Dried Pampas Collection</span>
          <span>→</span>
        </div>
      </section>

      {/* Social strip */}
      <div className="social-strip">
        <a href="#" aria-label="Instagram">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
        </a>
        <a href="#" aria-label="Twitter">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
        </a>
        <a href="#" aria-label="Facebook">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
        </a>
      </div>

      {/* Services */}
      <section className="services">
        <div className="container">
          <p className="section-label" style={{ textAlign: 'center' }}>This is what we do</p>
          <h2 className="section-title">Our Collections</h2>
          <div className="services-grid">
            {SERVICES.map(s => (
              <Link to={s.path} key={s.title} className="service-card">
                <div className="service-img">
                  <div className="service-icon">{s.emoji}</div>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="service-link">Explore</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Ideas / Feature Section */}
      <section className="feature-section">
        <div className="feature-content">
          <p className="section-label">Remember your loved ones</p>
          <h2>Gift Ideas That<br />Last Longer</h2>
          <p className="feature-desc">
            Our premium dried flower arrangements and artisan décor pieces make gifts
            that not only look beautiful, but stand the test of time. Ask our team for your perfect match.
          </p>
          <Link to="/vases" className="btn-primary">Let's Go</Link>
        </div>
        <div className="feature-visual">
          <div className="feature-circle">
            <div className="feature-orb" />
          </div>
        </div>
      </section>

      {/* Popular Section */}
      <section className="popular-section">
        <div className="container">
          <p className="section-label" style={{ textAlign: 'center' }}>Dried flower collection</p>
          <h2 className="section-title">See What's Popular</h2>
          <div className="popular-grid">
            {[
              { label: 'Pampas Arrangement', likes: 609, saves: 120 },
              { label: 'Shell & Candle Set', likes: 540, saves: 133 },
              { label: 'Minimalist Vase', likes: 463, saves: 192 },
              { label: 'Reed Diffuser', likes: 743, saves: 109 },
            ].map((item, i) => (
              <div key={i} className="popular-card">
                <div className="popular-img">
                  <div className="popular-placeholder" />
                </div>
                <div className="popular-meta">
                  <span>♥ {item.likes}</span>
                  <span>⊕ {item.saves}</span>
                  <span>Share</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-arch" />
        <div className="cta-content">
          <h2>Talk To Our Staff</h2>
          <p>
            Trouble choosing your piece? Our friendly customer service team can help
            you find your dream arrangement. We believe everyone deserves the right décor.
          </p>
          <Link to="/contact" className="btn-primary">Let's Talk</Link>
        </div>
      </section>
    </div>
  )
}
