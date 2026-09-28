import { FormEvent, useState } from 'react'

type IconName = 'arrow' | 'bag' | 'bike' | 'clock' | 'location' | 'menu' | 'search' | 'shop' | 'star' | 'x'

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    bag: <><path d="M6 8h12l1 13H5L6 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
    bike: <><circle cx="6" cy="17" r="4"/><circle cx="18" cy="17" r="4"/><path d="m6 17 4-7h4l4 7M8 7h4M10 10l4 7"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></>,
    shop: <><path d="M4 10h16l-1-5H5l-1 5Z"/><path d="M6 10v10h12V10M9 20v-6h6v6"/></>,
    star: <path d="m12 3 2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.9L12 3Z"/>,
    x: <><path d="m6 6 12 12M18 6 6 18"/></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const places = [
  { name: 'Chicken Republic', type: 'Chicken · Rice · Quick bites', time: 'Coming soon', badge: 'Most wanted', image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=900&q=82' },
  { name: 'Magboro Kitchen', type: 'Local dishes · Swallows', time: '25–35 min', badge: 'Local fave', image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=900&q=82' },
  { name: 'Grills & More', type: 'Grills · Shawarma · Drinks', time: '20–30 min', badge: 'Fast delivery', image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=82' },
]

const faqs = [
  ['Where does MoveGrid deliver?', 'We are launching across Magboro and nearby communities. Enter your address above or message us to confirm coverage for your street.'],
  ['How do I place an order?', 'Choose a nearby vendor, add what you want, share your delivery details, and we’ll handle the rest. For launch, orders are confirmed directly through our launch contact.'],
  ['Can my restaurant join MoveGrid?', 'Absolutely. We are onboarding restaurants, home kitchens, stores, and pharmacies in Magboro. Use the “Become a partner” link to get started.'],
  ['How long will delivery take?', 'Most local deliveries should arrive in 20–45 minutes. You’ll get a clear estimate before confirming your order.'],
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [address, setAddress] = useState('')
  const [activeFaq, setActiveFaq] = useState<number | null>(0)
  const [notice, setNotice] = useState('')

  const handleOrder = (event: FormEvent) => {
    event.preventDefault()
    if (!address.trim()) {
      setNotice('Tell us where in Magboro you are first.')
      return
    }
    setNotice(`Great — we’re checking delivery options around “${address.trim()}”.`)
    document.querySelector('#restaurants')?.scrollIntoView({ behavior: 'smooth' })
  }

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '')
  const orderUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello MoveGrid! I want to order in Magboro${address ? ` from ${address}` : ''}.`)}`
    : 'https://instagram.com/movegrid_ng'

  return (
    <main>
      <div className="announcement">MoveGrid is landing in Magboro <span>•</span> Early orders opening soon</div>
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="MoveGrid home">
          <span className="brand-mark">M</span><span>movegrid</span><i>.</i>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}><Icon name={menuOpen ? 'x' : 'menu'} /></button>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#restaurants" onClick={() => setMenuOpen(false)}>Restaurants</a>
          <a href="#how" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#partners" onClick={() => setMenuOpen(false)}>For partners</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQs</a>
          <a className="button button-small button-dark" href={orderUrl} target="_blank" rel="noreferrer">DM us to order <Icon name="arrow" size={17}/></a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy shell">
          <div className="hero-content">
            <span className="eyebrow"><span className="pulse"/> Now serving Magboro</span>
            <h1>Your cravings.<br/><em>On the move.</em></h1>
            <p className="hero-lede">The food you love and everyday essentials from around Magboro, brought straight to your doorstep.</p>
            <form className="address-form" onSubmit={handleOrder}>
              <label className="address-field">
                <Icon name="location" size={21}/>
                <input value={address} onChange={(event) => { setAddress(event.target.value); setNotice('') }} placeholder="Enter your Magboro address" aria-label="Delivery address" />
              </label>
              <button className="button button-primary" type="submit">Find food <Icon name="arrow" size={18}/></button>
            </form>
            <div className="form-meta">
              {notice ? <span className="notice" role="status">{notice}</span> : <><span><Icon name="clock" size={15}/> From 20 mins</span><span><Icon name="bag" size={15}/> No minimum order</span></>}
            </div>
          </div>
          <div className="hero-art" aria-label="A MoveGrid delivery on the way">
            <span className="spark spark-one">✦</span><span className="spark spark-two">✦</span>
            <div className="hero-ring ring-one"/><div className="hero-ring ring-two"/>
            <div className="food-photo">
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=85" alt="A colourful table of food ready for delivery" />
              <div className="photo-label"><span>Fresh from<br/>around you</span><strong>✦</strong></div>
            </div>
            <div className="delivery-card">
              <span className="rider-icon"><Icon name="bike" size={28}/></span>
              <span><small>Rider is on the way</small><strong>8 mins away</strong></span>
              <span className="live-dot"/>
            </div>
            <div className="happy-sticker"><strong>HOT</strong><span>&amp; FAST</span></div>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="MoveGrid services"><div>GOOD FOOD <span>✦</span> LOCAL FAVOURITES <span>✦</span> QUICK DELIVERY <span>✦</span> MAGBORO FIRST <span>✦</span> GOOD FOOD <span>✦</span></div></section>

      <section className="section shell" id="restaurants">
        <div className="section-heading">
          <div><span className="kicker">Around your corner</span><h2>What are you<br/>in the mood for?</h2></div>
          <p>From quick lunch to late-night cravings, discover local favourites without leaving your gate.</p>
        </div>
        <div className="category-row" aria-label="Food categories">
          {['🍗 Chicken', '🍚 Rice', '🌯 Shawarma', '🥣 Swallows', '🛒 Groceries'].map((item, index) => <button key={item} className={index === 0 ? 'active' : ''}>{item}</button>)}
        </div>
        <div className="restaurant-grid">
          {places.map((place) => (
            <article className="restaurant-card" key={place.name}>
              <div className="card-photo"><img src={place.image} alt=""/><span>{place.badge}</span></div>
              <div className="card-copy">
                <div><h3>{place.name}</h3><p>{place.type}</p></div>
                <div className="card-meta"><span><Icon name="star" size={15}/> 4.8</span><span><Icon name="clock" size={15}/> {place.time}</span></div>
              </div>
            </article>
          ))}
        </div>
        <div className="center"><a className="text-link" href={orderUrl} target="_blank" rel="noreferrer">See what’s available today <Icon name="arrow" size={18}/></a></div>
      </section>

      <section className="how-section" id="how">
        <div className="shell">
          <div className="section-heading light"><div><span className="kicker">Easy does it</span><h2>From hungry<br/>to happy in 3.</h2></div><p>No long story. Good food from around Magboro, on its way to you in a few taps.</p></div>
          <div className="steps">
            {[
              { icon: 'location' as IconName, number: '01', title: 'Tell us where', text: 'Drop your Magboro address so we can show you what’s close.' },
              { icon: 'search' as IconName, number: '02', title: 'Pick your craving', text: 'Browse local kitchens, restaurants, shops, and their menus.' },
              { icon: 'bike' as IconName, number: '03', title: 'We move it', text: 'Track your delivery and meet your rider right at your gate.' },
            ].map((step) => <article className="step" key={step.number}><span className="step-number">{step.number}</span><div className="step-icon"><Icon name={step.icon} size={34}/></div><h3>{step.title}</h3><p>{step.text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="local-section shell">
        <div className="local-card local-main">
          <span className="kicker">More than meals</span>
          <h2>Forgot something?<br/>We’ll grid it.</h2>
          <p>Groceries, medicine, drinks, and last-minute essentials—from nearby stores to your door.</p>
          <a className="button button-dark" href={orderUrl} target="_blank" rel="noreferrer">Request an item <Icon name="arrow" size={18}/></a>
          <div className="bag-illustration"><span>MOVE</span><strong>GRID</strong><i>✦</i></div>
        </div>
        <div className="local-card local-quote">
          <span className="quote-mark">“</span>
          <blockquote>Built for our streets, our restaurants, and the way Magboro moves.</blockquote>
          <div className="quote-person"><span>MG</span><p><strong>The MoveGrid team</strong><small>Local people, local delivery</small></p></div>
        </div>
      </section>

      <section className="partner-section" id="partners">
        <div className="shell partner-grid">
          <div className="partner-copy"><span className="kicker">Let’s grow together</span><h2>Your business.<br/><em>More doorsteps.</em></h2><p>Own a restaurant, home kitchen, shop, or pharmacy in Magboro? Join the local delivery network built to help you reach more customers.</p><div className="partner-actions"><a className="button button-yellow" href="mailto:partners@movegrid.ng?subject=I want to join MoveGrid">Become a partner <Icon name="arrow" size={18}/></a><a href="mailto:riders@movegrid.ng?subject=I want to ride with MoveGrid" className="ride-link"><Icon name="bike"/> Ride with us</a></div></div>
          <div className="partner-visual">
            <div className="partner-orbit"><span><Icon name="shop" size={44}/></span><i>✦</i></div>
            <div className="partner-stat"><strong>0%</strong><span>setup fee<br/>for early partners</span></div>
          </div>
        </div>
      </section>

      <section className="faq-section shell" id="faq">
        <div className="faq-title"><span className="kicker">Questions, answered</span><h2>Before we<br/>get moving.</h2><p>Can’t find your answer? Send us a message and a real person will help.</p><a href={orderUrl} target="_blank" rel="noreferrer" className="text-link">Chat with MoveGrid <Icon name="arrow" size={18}/></a></div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => <article className={`faq ${activeFaq === index ? 'open' : ''}`} key={question}><button onClick={() => setActiveFaq(activeFaq === index ? null : index)} aria-expanded={activeFaq === index}><span>{question}</span><i>{activeFaq === index ? '−' : '+'}</i></button><div className="faq-answer"><p>{answer}</p></div></article>)}
        </div>
      </section>

      <footer>
        <div className="shell footer-main">
          <div><a className="brand brand-light" href="#top"><span className="brand-mark">M</span><span>movegrid</span><i>.</i></a><p>Good things from around Magboro,<br/>delivered to your doorstep.</p></div>
          <div className="footer-links"><div><strong>Explore</strong><a href="#restaurants">Restaurants</a><a href="#how">How it works</a><a href="#faq">FAQs</a></div><div><strong>Join us</strong><a href="#partners">Partner with us</a><a href="mailto:riders@movegrid.ng">Become a rider</a><a href="mailto:hello@movegrid.ng">Contact us</a></div><div><strong>Follow</strong><a href="https://instagram.com/movegrid_ng" target="_blank" rel="noreferrer">Instagram</a>{whatsappNumber && <a href={orderUrl} target="_blank" rel="noreferrer">WhatsApp</a>}</div></div>
        </div>
        <div className="shell footer-bottom"><span>© {new Date().getFullYear()} MoveGrid. Made in Magboro.</span><span>Food moves better together.</span></div>
      </footer>
    </main>
  )
}

export default App
