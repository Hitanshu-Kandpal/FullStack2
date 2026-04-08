import { useEffect, useState } from 'react'

import { getMyProjects } from '../components/Api'
import ErrorBox from '../components/ErrorBox'
import Loading from '../components/Loading'
import EmptyState from '../components/EmptyState'
import StatusBadge from '../components/StatusBadge'

const USERNAME = 'student1'

export default function MyProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    getMyProjects(USERNAME)
      .then((data) => {
        if (cancelled) return
        setProjects(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        if (cancelled) return
        setError(err?.message || 'Failed to load your projects.')
      })
      .finally(() => {
        if (cancelled) return
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="panel">
      <h1 className="page-title">My Projects</h1>
      <p className="muted">
        Projects for <strong>{USERNAME}</strong>
      </p>

      {error ? <ErrorBox message={error} /> : null}
      {loading ? <Loading label="Loading your projects..." /> : null}

      {!loading && !error && projects.length === 0 ? (
        <EmptyState title="No submitted projects" message="Submit a project to see it here." />
      ) : null}

      {!loading && !error && projects.length > 0 ? (
        <div className="list">
          {projects.map((p) => (
            <div key={p.id} className="card">
              <div className="meta-row">
                <StatusBadge status={p.status} />
                <div style={{ color: '#6b7280', fontSize: 12 }}>ID: {p.id}</div>
              </div>
              <h3>{p.title}</h3>

              <div style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.5 }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>Feedback</div>
                {p.feedback && String(p.feedback).trim() ? (
                  <div>{p.feedback}</div>
                ) : (
                  <div style={{ color: '#6b7280' }}>No feedback yet.</div>
                )}
              </div>

              {p.githubLink ? (
                <div style={{ marginTop: 12 }}>
                  <a className="github-link" href={p.githubLink} target="_blank" rel="noreferrer">
                    Open GitHub
                  </a>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

