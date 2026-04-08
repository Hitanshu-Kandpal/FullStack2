import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

import { getAllProjects, updateProject } from '../components/Api'
import ErrorBox from '../components/ErrorBox'
import Loading from '../components/Loading'
import StatusBadge from '../components/StatusBadge'

const STATUS_OPTIONS = ['PENDING', 'APPROVED', 'CHANGES_REQUIRED']

export default function ReviewPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const [project, setProject] = useState(null)
  const [status, setStatus] = useState('PENDING')
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setProject(null)

    getAllProjects()
      .then((data) => {
        if (cancelled) return
        const list = Array.isArray(data) ? data : []
        const found = list.find((p) => String(p.id) === String(id)) || null
        setProject(found)
        if (!found) {
          setError('Project not found.')
          return
        }
        setStatus(found.status || 'PENDING')
        setFeedback(found.feedback || '')
      })
      .catch((err) => {
        if (cancelled) return
        setError(err?.message || 'Failed to load project for review.')
      })
      .finally(() => {
        if (cancelled) return
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  const header = useMemo(() => {
    if (!project) return null
    return (
      <div style={{ marginBottom: 14 }}>
        <div className="meta-row" style={{ marginBottom: 6 }}>
          <StatusBadge status={status} />
          <div style={{ color: '#6b7280', fontSize: 12 }}>ID: {project.id}</div>
        </div>
        <h1 className="page-title" style={{ marginBottom: 6 }}>
          {project.title}
        </h1>
        <div className="muted" style={{ margin: 0 }}>
          by <strong>{project.username}</strong>
        </div>
      </div>
    )
  }, [project, status])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      await updateProject(id, { status, feedback })
      sessionStorage.setItem('flash', 'Review updated successfully.')
      navigate('/all')
    } catch (err) {
      setError(err?.message || 'Failed to save review.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="panel">
      {loading ? <Loading label="Loading project details..." /> : null}
      {!loading ? header : null}

      {error ? <ErrorBox message={error} /> : null}

      {!loading && project ? (
        <form className="form" onSubmit={handleSave}>
          <div className="field">
            <div className="label">Project Status</div>
            <select
              className="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s === 'CHANGES_REQUIRED'
                    ? 'CHANGES_REQUIRED'
                    : s === 'PENDING'
                      ? 'PENDING'
                      : 'APPROVED'}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <div className="label">Feedback</div>
            <textarea
              className="textarea"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write feedback for the student..."
            />
          </div>

          <div className="actions">
            <button className="button primary" type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Review'}
            </button>
            <Link className="button" to="/all" style={{ textDecoration: 'none' }}>
              Cancel
            </Link>
          </div>
        </form>
      ) : null}
    </div>
  )
}

