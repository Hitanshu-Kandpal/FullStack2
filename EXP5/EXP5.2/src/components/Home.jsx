import './page.css'
import { useEffect, useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const end = 6
    const dur = 900
    const step = Math.max(1, Math.floor((end - start) / (dur / 30)))
    const t = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(t)
      } else setCount(start)
    }, 30)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="page">
      <header className="hero">
        <div className="avatar">
          <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden>
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0" stopColor="#6ee7b7" />
                <stop offset="1" stopColor="#3dd9ff" />
              </linearGradient>
            </defs>
            <rect width="128" height="128" rx="18" fill="url(#g)" />
            <g transform="translate(16,22)" fill="#041824">
              <circle cx="48" cy="24" r="18" />
              <rect x="4" y="54" width="88" height="30" rx="8" />
            </g>
          </svg>
        </div>
        <div className="hero-body">
          <h2 className="title">Hi — I'm Hitanshu Kandpal</h2>
          <div className="subtitle">B.Tech Student • Web Developer • AI & Full Stack enthusiast</div>
          <div className="skills">
            <span className="chip">AI</span>
            <span className="chip">Web</span>
            <span className="chip">ML</span>
            <span className="chip">React</span>
            <span className="chip">Full-Stack</span>
          </div>

          <div className="metrics">
            <div className="metric">
              <div className="num">{count}</div>
              <div className="muted">Projects</div>
            </div>
            <div className="metric">
              <div className="num">Active</div>
              <div className="muted">Status</div>
            </div>
          </div>
        </div>
      </header>

      <div className="layout-grid">
        <div>
          <div className="card">
            <h3>About</h3>
            <p>
              Passionate about building full-stack web experiences and integrating AI features to
              make applications smarter and more helpful.
            </p>
          </div>

          <div className="card" style={{marginTop:12}}>
            <h3>College</h3>
            <p>Engineering — currently pursuing B.Tech</p>
          </div>
        </div>

        <div>
          <div className="card">
            <h3>What I build</h3>
            <p>
              Small-to-medium projects involving web technologies, ML prototypes, and tools to improve
              developer experience.
            </p>
          </div>

          <div className="card" style={{marginTop:12}}>
            <h3>Interests</h3>
            <p>Web development, scalable backends, and AI/ML integrations.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
