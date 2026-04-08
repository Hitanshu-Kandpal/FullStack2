const API_BASE_URL = 'http://localhost:8080'

async function apiRequest(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const text = await res.text()
  let data = null
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = text
    }
  }

  if (!res.ok) {
    const msg =
      (data && typeof data === 'object' && (data.message || data.error)) ||
      (typeof data === 'string' && data) ||
      `Request failed (${res.status})`
    throw new Error(msg)
  }

  return data
}

export function createProject({ title, description, githubLink, username }) {
  return apiRequest('/api/projects', {
    method: 'POST',
    body: { title, description, githubLink, username },
  })
}

export function getMyProjects(username) {
  return apiRequest(`/api/projects/my/${encodeURIComponent(username)}`)
}

export function getAllProjects() {
  return apiRequest('/api/projects')
}

export function updateProject(id, { status, feedback }) {
  return apiRequest(`/api/projects/${encodeURIComponent(String(id))}`, {
    method: 'PUT',
    body: { status, feedback },
  })
}

