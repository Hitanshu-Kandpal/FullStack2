import './page.css'

export default function About() {
  return (
    <section className="page">
      <header className="hero alt">
        <div className="hero-body">
          <h1 className="title">About — Hitanshu Kandpal</h1>
          <div className="subtitle">Full Stack learner focused on Web Development and AI integration.</div>
          <div style={{marginTop:12}} className="skills">
            <span className="chip">AI</span>
            <span className="chip">Web</span>
            <span className="chip">ML</span>
            <span className="chip">React</span>
          </div>
        </div>
      </header>

      <div className="content">
        <h2>Background</h2>
        <p>
          I'm a B.Tech student studying engineering. I enjoy building web applications and
          experimenting with AI to add intelligent features.
        </p>

        <h2>Focus Areas</h2>
        <p>
          My current focus is on Full Stack development and AI — combining backend services
          with frontend experiences to ship polished products.
        </p>

        <h2>Projects & Skills</h2>
        <div style={{display:'flex',gap:12,marginTop:8}}>
          <div className="card" style={{flex:1}}>
            <h3>Projects</h3>
            <p>Worked on ~6 projects ranging from web apps to ML prototypes.</p>
          </div>
          <div className="card" style={{flex:1}}>
            <h3>College</h3>
            <p>Engineering — B.Tech student</p>
          </div>
        </div>
      </div>
    </section>
  )
}
