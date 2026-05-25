import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import './index.css'


function Header() {  

  const { user, logout } = useAuth()
  const navigate = useNavigate()
  
  function handleLogout() {
    logout()
    navigate('/login')
  }
  return (
    
    <header className="header">
        <div className="header-content">
          <div className="logo">LOGO</div>
            <div>
                {user ? (
                <>
                    <span style={{ marginRight: 10 }}>👤 {user.login}</span>
                    <button onClick={handleLogout}>Вийти</button>
                </>
                ) : (
                <>
                    <a href="/login" style={{ marginRight: 10 }}>Увійти</a>
                    <a href="/register">Реєстрація</a>
                </>
                )}
            </div>
        </div>
    </header>
  )
}

export default Header
