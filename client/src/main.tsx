import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CookiesProvider } from 'react-cookie';
import { StrictMode } from 'react';

const queryClient = new QueryClient;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <CookiesProvider defaultSetOptions={{path: '/'}}>
      <StrictMode>
      <App />
      </StrictMode>
    </CookiesProvider>
  </QueryClientProvider>
)
