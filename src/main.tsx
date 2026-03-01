import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // ESTA LINHA É VITAL PARA AS CORES APARECEREM

// O robô do GitHub precisa encontrar o elemento "root" que o Senhor criou na index.html
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Mestre, não encontrei o elemento root no seu index.html. Verifique o arquivo!');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
