import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/global.scss';  
// import './assets/styles/auth.scss';   // if you created index.scss
import App from './App.jsx'

import { GoogleOAuthProvider } from '@react-oauth/google'

// Replace with your actual Google Client ID
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
