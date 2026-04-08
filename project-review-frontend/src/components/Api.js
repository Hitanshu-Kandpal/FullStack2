const API_BASE_URL = 'http://localhost:8080'
const TEACHER_USERNAME = 'teacher1'
const TEACHER_PASSWORD = 'teacher1'
const TOKEN_STORAGE_KEY = 'teacherJwtToken'

async function apiRequest(path, { method = 'GET', body, headers } = {}) {
  const mergedHeaders = {
    'Content-Type': 'application/json',
    ...(headers || {}),
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: mergedHeaders,
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

async function loginTeacher() {
  // Backend expects RequestParam username/password; query string is easiest for "no UI login".
  const url = `/api/login?username=${encodeURIComponent(TEACHER_USERNAME)}&password=${encodeURIComponent(TEACHER_PASSWORD)}`
  const res = await fetch(`${API_BASE_URL}${url}`, { method: 'POST' })
  const token = await res.text()

  if (!res.ok) {
    throw new Error(token || 'Login failed.')
  }

  // Your backend returns "Invalid Credentials" as plain text on failure.
  const tokenTrimmed = String(token || '').trim()
  if (!tokenTrimmed || tokenTrimmed.includes('Invalid')) {
    throw new Error('JWT login failed (invalid credentials).')
  }

  sessionStorage.setItem(TOKEN_STORAGE_KEY, tokenTrimmed)
  return tokenTrimmed
}

export async function ensureTeacherToken() {
  const existing = sessionStorage.getItem(TOKEN_STORAGE_KEY)
  if (existing) return existing
  return loginTeacher()
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
  return (async () => {
    const token = await ensureTeacherToken()
    return apiRequest(`/api/projects/${encodeURIComponent(String(id))}`, {
      method: 'PUT',
      body: { status, feedback },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  })()
}

export function deleteProject(id) {
  return (async () => {
    const token = await ensureTeacherToken()
    return apiRequest(`/api/projects/${encodeURIComponent(String(id))}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  })()
}

