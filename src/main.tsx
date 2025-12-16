import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes/App.tsx'
import { BrowserRouter } from 'react-router'
import { Theme } from '@radix-ui/themes'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Theme>
      <App />
    </Theme>
  </BrowserRouter>,
)
