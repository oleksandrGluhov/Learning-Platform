import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({ login: '', password: '' })
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const res = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      return
    }

    navigate('/login')
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 20 }}>
      <h2>Реєстрація</h2>
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
          Зареєструватись
        </button>
      </form>
      <p>
        Вже є акаунт? <a href="/login">Увійти</a>
      </p>
    </div>
  )
}