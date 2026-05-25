import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ login: '', password: '' })
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const res = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      return
    }

    login(data.token, data.user)
    navigate('/')
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
      <h2>Вхід</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <input
            placeholder="Логін"
            value={form.login}
            onChange={e => setForm({ ...form, login: e.target.value })}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <input
            type="password"
            placeholder="Пароль"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: 10 }}>
          Увійти
        </button>
      </form>
      <p>
        Немає акаунту? <a href="/register">Зареєструватись</a>
      </p>
    </div>
  )
}