import React from 'react';
import ReactDOM from 'react-dom/client';
// IMPORTANTE: Se o seu arquivo for app.tsx, mude para './app'
import App from './App'; 
import './index.css'; 

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  // Isso evita que o app trave se o HTML demorar a carregar
  console.error('Elemento root não encontrado no HTML.');
}
