// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // ✅ necesario para Helmet
import App from './App';

// 1) Bootstrap base
import 'bootstrap/dist/css/bootstrap.min.css';

// 2) Tu CSS global: variables, reset y utilidades
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);
