import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getAllProjects } from '../components/Api'
import ErrorBox from '../components/ErrorBox'
import Loading from '../components/Loading'
import StatusBadge from '../components/StatusBadge'
import EmptyState from '../components/EmptyState'

export default function AllProjectsPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    getAllProjects()
      .then((data) => {
        if (cancelled) return
        setProjects(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        if (cancelled) return
        setError(err?.message || 'Failed to load all projects.')
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
      <h1 className="page-title">All Projects</h1>
      <p className="muted">Submissions from all users.</p>

      {error ? <ErrorBox message={error} /> : null}
      {loading ? <Loading label="Loading submissions..." /> : null}

      {!loading && !error && projects.length === 0 ? (
        <EmptyState title="No submissions" message="There are no projects in the system yet." />
      ) : null}

      {!loading && !error && projects.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th style={{ width: 140 }}>Username</th>
              <th>Title</th>
              <th style={{ width: 180 }}>Status</th>
              <th style={{ width: 120 }} />
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>{p.username}</td>
                <td style={{ fontWeight: 700 }}>{p.title}</td>
                <td>
                  <StatusBadge status={p.status} />
                </td>
                <td>
                  <Link to={`/review/${p.id}`} className="github-link">
                    Review
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  )
}

