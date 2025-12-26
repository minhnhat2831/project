import { createRoot } from 'react-dom/client'
import './index.css'
import App from './routes/App.tsx'
import { BrowserRouter } from 'react-router'
import { Theme } from '@radix-ui/themes'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Theme>
        <App />
      </Theme>
    </QueryClientProvider>
  </BrowserRouter>,
)
