import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Vercel Analytics y SpeedInsights (se importan dinámicamente para Vite/React)
try {
  import('@vercel/analytics').then(module => {
    module.inject();
  });
} catch (e) {
  console.log('Analytics no disponible');
}

try {
  import('@vercel/speed-insights').then(module => {
    module.inject();
  });
} catch (e) {
  console.log('SpeedInsights no disponible');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
