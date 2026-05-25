// import React from 'react'   
// import ReactDOM from 'react-dom/client'
// import App from './App'
// import Header from './Header.tsx'
// import {
//   BrowserRouter,
// } from 'react-router-dom'

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <BrowserRouter>
//     <Header/>
//     <App />
//   </BrowserRouter>
// )
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/AuthContext'

import {
  BrowserRouter,
} from 'react-router-dom'
import Header from './Header'

ReactDOM.createRoot(
  document.getElementById('root')!,
).render(

  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Header/>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)