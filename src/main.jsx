// Main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import { AuthProvider } from './AuthContext';

import App from './Routes.jsx'; // asegúrate de que el path sea correcto

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

