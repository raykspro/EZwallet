import React from 'react';
import ReactDOM from 'react-dom/client';
// Padronizado para buscar o arquivo App.tsx (Maiúsculo)
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
  // Diagnóstico preciso para o Senhor caso o HTML falhe
  console.error('Falha Crítica: Elemento "root" não encontrado no index.html.');
}
