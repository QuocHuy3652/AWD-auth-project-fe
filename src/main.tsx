import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import { AuthProvider } from './contexts/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <CssBaseline />
    <AuthProvider>
      <App />
    </AuthProvider>
  </>,
)
