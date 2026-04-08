import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import { ensureTeacherToken, getAllProjects, updateProject } from '../components/Api'
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
  const [jwtStatus, setJwtStatus] = useState(null) // null | 'yes' | 'no'
  const [showReadmeBox, setShowReadmeBox] = useState(false)
  const [readmeLoading, setReadmeLoading] = useState(false)
  const [readmeText, setReadmeText] = useState(null)

  function buildReadmeRawInfo(githubLink) {
    try {
      if (!githubLink) return null
      const u = new URL(githubLink)
      if (!u.hostname || u.hostname.toLowerCase() !== 'github.com') return null

      const parts = u.pathname.split('/').filter(Boolean)
      const owner = parts[0]
      const repo = parts[1]
      if (!owner || !repo) return null

      const rawRepoRootUrl = `https://raw.githubusercontent.com/${owner}/${repo}/`

      let branch = 'main'
      const treeIdx = parts.indexOf('tree')
      const blobIdx = parts.indexOf('blob')

      if (treeIdx >= 0) {
        branch = parts[treeIdx + 1] || 'main'
        const submittedPathParts = parts.slice(treeIdx + 2) // after /tree/<branch>/
        const submittedPath = submittedPathParts.join('/')

        // If the student links to a folder, we load README.md from that folder.
        const readmePath = submittedPath ? `${submittedPath}/README.md` : 'README.md'
        const readmeDir = submittedPath ? submittedPath : ''
        const readmeUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${readmePath}`
        return { owner, repo, branch, readmePath, readmeDir, rawRepoRootUrl: rawRepoRootUrl + branch + '/', readmeUrl }
      }

      if (blobIdx >= 0) {
        branch = parts[blobIdx + 1] || 'main'
        const blobPathParts = parts.slice(blobIdx + 2) // after /blob/<branch>/
        if (blobPathParts.length === 0) return null

        // If the link points directly to a README file, use it as-is.
        const blobPath = blobPathParts.join('/')
        const readmePath = blobPath
        const readmeDir = blobPath.includes('/') ? blobPath.split('/').slice(0, -1).join('/') : ''
        const readmeUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${blobPath}`
        return { owner, repo, branch, readmePath, readmeDir, rawRepoRootUrl: rawRepoRootUrl + branch + '/', readmeUrl }
      }

      // Fallback: assume repo root README.
      const readmePath = 'README.md'
      const readmeDir = ''
      const readmeUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${readmePath}`
      return { owner, repo, branch, readmePath, readmeDir, rawRepoRootUrl: rawRepoRootUrl + branch + '/', readmeUrl }
    } catch {
      return null
    }
  }

  function resolveRepoPath(fromDir, relPath) {
    if (!relPath) return relPath
    let src = String(relPath).split('?')[0].trim()
    if (!src) return src

    // Leave already-resolved URLs as-is.
    if (src.startsWith('data:')) return src

    // Convert common GitHub "blob" URLs into raw.githubusercontent.com URLs for images.
    if (src.startsWith('http://') || src.startsWith('https://')) {
      try {
        const u = new URL(src)
        if (u.hostname && u.hostname.toLowerCase() === 'github.com') {
          const parts = u.pathname.split('/').filter(Boolean)
          const owner = parts[0]
          const repo = parts[1]
          const blobIdx = parts.indexOf('blob')
          if (owner && repo && blobIdx >= 0 && parts[blobIdx + 1]) {
            const branch = parts[blobIdx + 1]
            const filePath = parts.slice(blobIdx + 2).join('/')
            if (filePath) {
              return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`
            }
          }
        }
      } catch {
        // Fall through to returning original src
      }

      return src
    }

    // Absolute path in repo (from /...).
    if (src.startsWith('/')) {
      src = src.replace(/^\/+/, '')
      return src
    }

    // Remove leading "./" but keep "../" intact.
    src = src.replace(/^\.?\//, '')

    const baseSegments = fromDir ? fromDir.split('/').filter(Boolean) : []
    const relSegments = src.split('/').filter(Boolean)

    for (const seg of relSegments) {
      if (seg === '.' || seg === '') continue
      if (seg === '..') {
        if (baseSegments.length > 0) baseSegments.pop()
      } else {
        baseSegments.push(seg)
      }
    }

    return baseSegments.join('/')
  }

  const readmeRawInfo = useMemo(() => buildReadmeRawInfo(project?.githubLink), [project?.githubLink])
  const readmeEmbedUrl = readmeRawInfo?.readmeUrl ?? null

  const markdownComponents = useMemo(() => {
    if (!readmeRawInfo) return {}

    const rawRepoRootUrl = readmeRawInfo.rawRepoRootUrl
    const readmeDir = readmeRawInfo.readmeDir

    return {
      img: ({ src, alt }) => {
        const rewrittenSrc =
          src && rawRepoRootUrl
            ? rawRepoRootUrl + resolveRepoPath(readmeDir, src)
            : src

        return (
          <img
            src={rewrittenSrc}
            alt={alt || ''}
            style={{ maxWidth: '100%', height: 'auto', borderRadius: 10, display: 'block', margin: '12px 0' }}
          />
        )
      },
    }
  }, [readmeRawInfo])

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

  useEffect(() => {
    let cancelled = false
    ensureTeacherToken()
      .then(() => {
        if (cancelled) return
        setJwtStatus('yes')
      })
      .catch(() => {
        if (cancelled) return
        setJwtStatus('no')
      })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    // Reset iframe toggle when navigating between projects.
    setShowReadmeBox(false)
    setReadmeText(null)
    setReadmeLoading(false)
  }, [project?.id])

  useEffect(() => {
    if (!showReadmeBox) return
    if (!readmeEmbedUrl) return
    if (readmeText && String(readmeText).trim()) return

    let cancelled = false
    setReadmeLoading(true)
    setReadmeText(null)

    fetch(readmeEmbedUrl)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return await res.text()
      })
      .then((t) => {
        if (cancelled) return
        setReadmeText(t)
      })
      .catch(() => {
        if (cancelled) return
        setReadmeText('')
      })
      .finally(() => {
        if (cancelled) return
        setReadmeLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [showReadmeBox, readmeEmbedUrl])

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
        {jwtStatus ? (
          <div className="muted" style={{ marginTop: 6 }}>
            JWT authenticated: <strong>{jwtStatus === 'yes' ? 'Yes' : 'No'}</strong>
          </div>
        ) : null}
      </div>
    )
  }, [project, status, jwtStatus])

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
        <div style={{ marginTop: 14 }}>
          {project.githubLink ? (
            <div style={{ marginBottom: 12 }}>
              <div className="label">GitHub Repository</div>
              <a className="github-link" href={project.githubLink} target="_blank" rel="noreferrer">
                Open GitHub
              </a>
            </div>
          ) : null}

          <div style={{ marginBottom: 10 }}>
            <div className="label">README</div>
            {project.readmeContent && String(project.readmeContent).trim() ? (
              <div className="readme">
                <ReactMarkdown components={markdownComponents}>{project.readmeContent}</ReactMarkdown>
              </div>
            ) : (
              <div className="readme" style={{ padding: 14 }}>
                <button
                  type="button"
                  className="button primary"
                  onClick={() => setShowReadmeBox((v) => !v)}
                  disabled={!readmeEmbedUrl}
                >
                  {showReadmeBox ? 'Hide README in box' : 'View README in box'}
                </button>
                {showReadmeBox ? (
                  readmeEmbedUrl ? (
                    <div style={{ marginTop: 12 }}>
                      {readmeLoading ? (
                        <div className="loading">Loading README...</div>
                      ) : readmeText && readmeText.trim() ? (
                        <div className="readme" style={{ marginTop: 10 }}>
                          <ReactMarkdown components={markdownComponents}>{readmeText}</ReactMarkdown>
                        </div>
                      ) : (
                        <div className="loading" style={{ paddingTop: 10 }}>
                          Could not load README from GitHub raw URL.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="loading" style={{ paddingTop: 10 }}>
                      Could not build README URL from your submitted GitHub link.
                    </div>
                  )
                ) : null}
              </div>
            )}
          </div>
        </div>
      ) : null}

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

