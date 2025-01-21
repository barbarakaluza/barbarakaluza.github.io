// serviceWorkerRegistration.js
// Kod rejestrujący Service Worker
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      window.location.hostname === '[::1]' ||
      window.location.hostname === '127.0.0.1'
  );
  
  export function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      // Sprawdzenie, czy service worker jest dostępny w przeglądarce
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
      if (isLocalhost) {
        // Sprawdzenie, czy aplikacja działa na localhost
        checkValidServiceWorker(swUrl, config);
      } else {
        // Rejestracja service worker w trybie produkcyjnym
        registerValidSW(swUrl, config);
      }
    }
  }
  
  function registerValidSW(swUrl, config) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('Service Worker rejestracja udana:', registration);
        if (config && config.onSuccess) {
          config.onSuccess(registration);
        }
      })
      .catch((error) => {
        console.error('Service Worker rejestracja nieudana:', error);
        if (config && config.onError) {
          config.onError(error);
        }
      });
  }
  
  function checkValidServiceWorker(swUrl, config) {
    // Sprawdzanie, czy service worker jest dostępny i działa poprawnie
    fetch(swUrl, {
      headers: { 'Service-Worker': 'script' },
    })
      .then((response) => {
        const contentType = response.headers.get('content-type');
        if (response.status === 404 || (contentType && contentType.indexOf('javascript') === -1)) {
          // Jeśli nie znaleziono pliku service worker lub jest on niepoprawny
          navigator.serviceWorker.ready.then((registration) => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          registerValidSW(swUrl, config);
        }
      })
      .catch(() => {
        console.log('Brak dostępu do service worker na tym serwerze');
      });
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }
  