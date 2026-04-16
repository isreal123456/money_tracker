import { createContext, useEffect, useState } from 'react'
import { loginRequest, meRequest, signupRequest } from '../services/authApi.js'
import {
  clearAuthToken,
  clearAuthUser,
  loadAuthToken,
  loadAuthUser,
  saveAuthToken,
  saveAuthUser,
} from '../services/storage'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => loadAuthToken())
  const [user, setUser] = useState(() => {
    return loadAuthUser()
  })
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    if (!token) {
      setAuthReady(true)
      return
    }

    const restore = async () => {
      try {
        const profile = await meRequest(token)
        setUser(profile)
        saveAuthUser(profile)
      } catch {
        setUser(null)
        setToken(null)
        clearAuthUser()
        clearAuthToken()
      } finally {
        setAuthReady(true)
      }
    }

    restore()
  }, [token])

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error('Email and password required')
    }

    const auth = await loginRequest({ email, password })
    setUser(auth.user)
    setToken(auth.token)
    saveAuthUser(auth.user)
    saveAuthToken(auth.token)
    return auth.user
  }

  const signup = async (email, password, name) => {
    if (!email || !password || !name) {
      throw new Error('All fields required')
    }

    const auth = await signupRequest({ name, email, password })
    setUser(auth.user)
    setToken(auth.token)
    saveAuthUser(auth.user)
    saveAuthToken(auth.token)
    return auth.user
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    clearAuthUser()
    clearAuthToken()
  }

  return (
    <AuthContext.Provider value={{ user, token, authReady, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
