import React from 'react';
import ReactDOM from 'react-dom/client';
import initMsw from '@/mocks/initMsw';
import App from './App';

(async () => {
  await initMsw();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})();
