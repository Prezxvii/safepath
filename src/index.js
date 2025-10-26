import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import your custom ThemeProvider
import { ThemeProvider } from './context/ThemeContext'; 

// 🛑 CRITICAL NEW IMPORT: Import the AIProvider
import { AIProvider } from './context/AIContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* 1. Wrap the entire application with the AIProvider */}
    <AIProvider> 
        {/* 2. Nest the ThemeProvider (and any others) inside it */}
        <ThemeProvider> 
          <App />
        </ThemeProvider>
    </AIProvider>
  </React.StrictMode>
);