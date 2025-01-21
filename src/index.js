import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { register } from './serviceWorkerRegistration'; // Import rejestracji Service Workera

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

register({
  onSuccess: () => console.log('Service Worker zarejestrowany pomyślnie'),
  onError: (error) => console.log('Błąd rejestracji Service Workera: ', error)
});

reportWebVitals();
