import { Link } from 'react-router-dom'
import './Home.css'

const SERVICES = [
  {
    title: 'Vases',
    path: '/vases',
    desc: 'Handcrafted ceramic and glass vases for every corner of your home.',
    img: 'https://res.cloudinary.com/dneoqeyoa/image/upload/v1773457671/Bubble_Vase_2_qpihve.jpg'
  },
  {
    title: 'Candles',
    path: '/candles',
    desc: 'Scented soy candles that fill your space with warmth and calm.',
    img: 'https://res.cloudinary.com/dneoqeyoa/image/upload/v1773454391/adorno_products/xwq403eplk1bbpcfnjkx.jpg'
  },
  {
    title: 'Lamps',
    path: '/lamps',
    desc: 'Sculptural lighting that doubles as a work of art.',
    img: 'https://res.cloudinary.com/dneoqeyoa/image/upload/v1773455281/adorno_products/fvhxxhzyw4krq0eseggj.jpg'
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
          <br></br><br></br><br></br>
          <p className="section-label" style={{ color: 'rgba(253,250,247,0.7)' }}>Elegant Home Decor</p>
          <h1>Decoration Pieces<br />for <em>Quiet Spaces</em></h1>
          <p className="hero-sub">Free delivery on orders over Rs500</p>
          <Link to="/all-products" className="btn-primary" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.6)' }}>
            Shop Now
          </Link>
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
                  <img src={s.img} alt={s.title} className="service-icon"/>
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
            Our elegant decor pieces make gifts
            that not only look beautiful, but stand the test of time. Ask our team for your perfect match.
          </p>
          <Link to="/all-products" className="btn-primary">Let's Go</Link>
        </div>
        <div className="feature-visual">
          <img src="https://res.cloudinary.com/dneoqeyoa/image/upload/v1773454613/adorno_products/rs3ozu1sy7vwm0hdp11f.jpg" alt=" Vase" className="feature-img"/>
        </div>
      </section>

      {/* Popular Section */}
      <section className="popular-section">
        <div className="container">
          <p className="section-label" style={{ textAlign: 'center' }}>Our Minimalistic Lamps</p>
          <h2 className="section-title">See What's Popular</h2>
          <div className="popular-grid">
            {[
              { label: 'Autumn Lights', purchases:90, img:'https://res.cloudinary.com/dneoqeyoa/image/upload/v1773454982/adorno_products/xuahtxtzq0lspauus098.jpg'},
              { label: 'Moon Lamp', purchases: 104,img:"https://res.cloudinary.com/dneoqeyoa/image/upload/v1773455094/adorno_products/dpugbcjbgfutcnfgkcou.jpg" },
              { label: 'Glow Lamp', purchases: 80, img:'https://res.cloudinary.com/dneoqeyoa/image/upload/v1773455327/adorno_products/o9nz7e52ublhrzej37yw.jpg'},
              { label: 'Bamboo Lights', purchases: 70, img:'https://res.cloudinary.com/dneoqeyoa/image/upload/v1773455394/adorno_products/hz0ywwvu68eyjbfyfxw5.jpg' },
            ].map((item, i) => (
              <div key={i} className="popular-card">
                <div className="popular-img">
                  <img src={item.img} alt={item.label} />
                </div>
                <div className="popular-meta">
                  <span>{item.purchases} bought</span>
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
