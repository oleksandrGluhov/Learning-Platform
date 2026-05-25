import { createContext, useContext, useState } from 'react'

type User = {
  id: number
  login: string
  role: string
}

type AuthContextType = {
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const u = localStorage.getItem('user')
    return u ? JSON.parse(u) : null
  })

  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem('token')
  )

  function login(token: string, user: User) {
    setToken(token)
    setUser(user)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  function logout() {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}