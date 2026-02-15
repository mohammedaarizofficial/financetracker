import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider.tsx';
import { FinanceProvider } from './context/FinanceProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FinanceProvider>
          <App />
        </FinanceProvider>
      </AuthProvider>  
    </BrowserRouter>
  </StrictMode>,
)
