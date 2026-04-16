const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim() || ''

const buildUrl = (path) => {
  if (!API_BASE_URL) {
    return path
  }

  if (/^https?:\/\//.test(path)) {
    return path
  }

  const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL
  const suffix = path.startsWith('/') ? path : `/${path}`
  return `${base}${suffix}`
}

export async function apiRequest(path, { method = 'GET', token, body } = {}) {
  const headers = {
    Accept: 'application/json',
  }

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(buildUrl(path), {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (response.status === 204) {
    return null
  }

  let payload = null
  try {
    payload = await response.json()
  } catch {
    payload = null
  }

  if (!response.ok) {
    const message = payload?.detail || payload?.message || `Request failed: ${response.status}`
    throw new Error(message)
  }

  return payload
}

