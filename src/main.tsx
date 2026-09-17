import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/fredoka/700.css'
import '@fontsource/nunito/700.css'
import './styles/tokens.css'
import './styles/global.css'
import './styles/animations.css'
import { App } from './App'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Missing #root')
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
