import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 10,
        gcTime: 1000 * 60 * 5
      }
    }
  }
)
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" reverseOrder={false} />
      <App />
    </QueryClientProvider>
  </BrowserRouter>
)