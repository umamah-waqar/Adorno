import './Static.css'

export function About() {
  return (
    <div className="static-page page-enter">
      <div className="static-hero">
        <div className="static-hero-bg" />
        <div className="static-hero-content">
          <p className="section-label" style={{ color: 'rgba(253,250,247,0.6)' }}>Our Story</p>
          <h1>About Adorno</h1>
        </div>
      </div>
      <div className="container static-body">
        <div className="static-grid">
          <div className="static-text">
            <h2>Objects worth living with</h2>
            <p>
              Adorno was born from a simple belief: that the objects we surround ourselves with
              should be beautiful, considered, and made to last. We source directly from artisan
              studios across the world, bringing you pieces that carry the mark of their maker.
            </p>
            <p>
              Every vase, candle, and lamp in our collection is chosen with care — for its
              craftsmanship, its story, and its ability to quietly transform a space.
            </p>
          </div>
          <div className="static-visual">
            <div className="static-arch" />
          </div>
        </div>

        <div className="static-values">
          {[
            { title: 'Handcrafted', desc: 'Every piece is made by skilled artisans, not machines.' },
            { title: 'Considered', desc: 'We only carry what we truly love and believe in.' },
            { title: 'Lasting', desc: 'Quality over quantity — objects that endure.' },
          ].map(v => (
            <div key={v.title} className="static-value-card">
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Contact() {
  return (
    <div className="static-page page-enter">
      <div className="static-hero">
        <div className="static-hero-bg" />
        <div className="static-hero-content">
          <p className="section-label" style={{ color: 'rgba(253,250,247,0.6)' }}>Get in touch</p>
          <h1>Contact Us</h1>
        </div>
      </div>
      <div className="container static-body">
        <div className="static-grid">
          <div className="static-text">
            <h2>We'd love to hear from you</h2>
            <p>
              Have a question about an order, a product, or just want to say hello?
              Our team is here to help. Reach out and we'll respond within 24 hours.
            </p>
            <div className="contact-details">
              <div>
                <p className="section-label">Email</p>
                <p>hello@adorno.com</p>
              </div>
              <div>
                <p className="section-label">Phone</p>
                <p>+92 300 0000000</p>
              </div>
              <div>
                <p className="section-label">Hours</p>
                <p>Mon–Fri, 9am–6pm PKT</p>
              </div>
            </div>
          </div>
          <div className="contact-form-side">
            <form className="contact-form" onSubmit={e => e.preventDefault()}>
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="hello@example.com" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows={5} placeholder="How can we help?" />
              </div>
              <button type="submit" className="btn-filled">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
