import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider.tsx';
import { FinanceProvider } from './context/FinanceProvider.tsx';
import { SidebarProvider } from './context/SidebarContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FinanceProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </FinanceProvider>
      </AuthProvider>  
    </BrowserRouter>
  </StrictMode>,
)
