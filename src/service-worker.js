export function register() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        navigator.serviceWorker
          .register(swUrl)
          .then((registration) => {
            console.log('Service Worker zarejestrowany:', registration);
          })
          .catch((error) => {
            console.error('Rejestracja Service Workera nie powiodła się:', error);
          });
      });
    } else {
      console.log('Service Worker nie jest wspierany w tej przeglądarce.');
    }
  }