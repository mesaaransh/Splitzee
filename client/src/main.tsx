import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CookiesProvider } from 'react-cookie';
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <App />
    </CookiesProvider>
  </StrictMode>
)
