import { createContext, useContext, useState } from 'react'
import { clearAuthUser, loadAuthUser, saveAuthUser } from '../services/storage'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return loadAuthUser()
  })

  const login = (email, password) => {
    if (!email || !password) {
      throw new Error('Email and password required')
    }

    const newUser = {
      id: `user_${Date.now()}`,
      email,
      name: email.split('@')[0],
      createdAt: new Date().toISOString(),
    }
    setUser(newUser)
    saveAuthUser(newUser)
    return newUser
  }

  const signup = (email, password, name) => {
    if (!email || !password || !name) {
      throw new Error('All fields required')
    }

    const newUser = {
      id: `user_${Date.now()}`,
      email,
      name,
      createdAt: new Date().toISOString(),
    }
    setUser(newUser)
    saveAuthUser(newUser)
    return newUser
  }

  const logout = () => {
    setUser(null)
    clearAuthUser()
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { useAuth }

function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

