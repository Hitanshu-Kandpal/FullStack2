import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="panel">
      <h1 className="page-title">Page not found</h1>
      <p className="muted">The route you requested does not exist.</p>
      <Link className="button primary" to="/" style={{ textDecoration: 'none' }}>
        Go to Submit
      </Link>
    </div>
  )
}

