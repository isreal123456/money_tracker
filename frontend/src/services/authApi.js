import { apiRequest } from './api'

export const signupRequest = (payload) =>
  apiRequest('/api/auth/signup', {
    method: 'POST',
    body: payload,
  })

export const loginRequest = (payload) =>
  apiRequest('/api/auth/login', {
    method: 'POST',
    body: payload,
  })

export const meRequest = (token) =>
  apiRequest('/api/auth/me', {
    token,
  })

