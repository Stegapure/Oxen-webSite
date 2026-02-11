import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Vercel Analytics (SpeedInsights se carga automáticamente por el paquete)
try {
  import('@vercel/analytics').then(({ inject }) => inject());
} catch (e) {
  // Analytics no disponible
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
