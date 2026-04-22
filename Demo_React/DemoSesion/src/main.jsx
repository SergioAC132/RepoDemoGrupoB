import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
//import AppLocalStorage from './sesionLocalStorage/AppLocalStorage.jsx'
import AppCookie from './cookies/AppCookie'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppCookie />
  </StrictMode>,
)
