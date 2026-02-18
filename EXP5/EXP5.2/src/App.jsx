import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import './components/hero-anim.css'
import Loading from './components/Loading'
import lazyWithDelay from './utils/lazyWithDelay'

const Home = lazyWithDelay(() => import('./components/Home'), { ms: 1000, fallback: <Loading /> })
const About = lazyWithDelay(() => import('./components/About'), { ms: 1000, fallback: <Loading /> })
const Contact = lazyWithDelay(() => import('./components/Contact'), { ms: 1000, fallback: <Loading /> })

function Nav() {
  const prefetch = (route) => {
    // warm up the chunk on hover/focus
    if (route === 'about') import('./components/About')
    if (route === 'contact') import('./components/Contact')
    if (route === 'home') import('./components/Home')
  }

  return (
    <nav className="nav">
      <div className="brand">EXP5.2</div>
      <div className="links">
        <Link to="/" onMouseEnter={() => prefetch('home')} onFocus={() => prefetch('home')}>Home</Link>
        <Link to="/about" onMouseEnter={() => prefetch('about')} onFocus={() => prefetch('about')}>About</Link>
        <Link to="/contact" onMouseEnter={() => prefetch('contact')} onFocus={() => prefetch('contact')}>Contact</Link>
      </div>
    </nav>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="bg-blobs" aria-hidden>
        <div className="blob a"></div>
        <div className="blob b"></div>
      </div>
      <header className="app-header">
        <Nav />
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
