import './page.css'
import { useState } from 'react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
      setTimeout(() => setStatus('idle'), 2200)
    }, 800)
  }

  return (
    <section className="page">
      <header className="hero alt2">
        <h1>Get in touch</h1>
        <p className="lead">Questions, feedback, or ideas? Drop a message.</p>
      </header>

      <div className="content contact">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </label>
          <label>
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </label>
          <label>
            Message
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us what's on your mind" />
          </label>
          <button className="btn" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Sent ✓' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  )
}
