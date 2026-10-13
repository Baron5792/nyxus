import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "flag-icons/css/flag-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { UserProvider } from './context/authContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from './context/ThemeContext';
import { RatesProvider } from './context/rateContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
          <ThemeProvider>
            <RatesProvider>
              <App />
            </RatesProvider>
          </ThemeProvider>
        </GoogleOAuthProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
