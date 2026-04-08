import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { createProject } from '../components/Api'
import ErrorBox from '../components/ErrorBox'
import Loading from '../components/Loading'

const USERNAME = 'student1'

export default function SubmitPage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [githubLink, setGithubLink] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)

    const payload = { title, description, githubLink, username: USERNAME }

    try {
      await createProject(payload)
      sessionStorage.setItem('flash', 'Project submitted successfully.')
      navigate('/my')
    } catch (err) {
      setError(err?.message || 'Failed to submit project.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="panel">
      <h1 className="page-title">Submit Project</h1>
      <p className="muted">
        Submitting as <strong>{USERNAME}</strong>
      </p>

      {error ? <ErrorBox message={error} /> : null}

      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <div className="label">Title</div>
          <input
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g., School Attendance App"
          />
        </div>

        <div className="field">
          <div className="label">Description</div>
          <textarea
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="What does your project do?"
          />
        </div>

        <div className="field">
          <div className="label">GitHub Link</div>
          <input
            className="input"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            required
            type="url"
            placeholder="https://github.com/username/repo"
          />
        </div>

        <div className="actions">
          <button className="button primary" disabled={submitting} type="submit">
            {submitting ? 'Submitting...' : 'Submit'}
          </button>
          {submitting ? <Loading label="Submitting to backend..." /> : null}
        </div>
      </form>
    </div>
  )
}

