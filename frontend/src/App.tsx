import {
  Routes,
  Route,
} from 'react-router-dom'

import SubjectsPage from './SubjectsPage'
import TestsPage from './TestsPage'
import TestPage from './TestPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SubjectsPage />} />
      <Route path="/subjects/:id" element={<TestsPage />} />
      <Route path="/tests/:id"element={<TestPage />}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default App