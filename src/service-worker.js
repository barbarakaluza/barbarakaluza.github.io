/* eslint-disable no-restricted-globals */

import { precacheAndRoute } from 'workbox-precaching';

// Workbox automatycznie zajmuje się cachowaniem plików na podstawie manifestu
precacheAndRoute(self.__WB_MANIFEST);

// Dodatkowe konfiguracje, np. ustawienia dla aktywacji Service Workera
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'my-app-cache') {
            return caches.delete(cacheName);  // Usuwanie cache
          } else {
            return null;  // Zwracamy null, aby zachować spójność
          }
        })
      );
    })
  );
});



// Przykładowy handler dla fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Jeśli zasób jest w pamięci podręcznej, zwróć go
      if (cachedResponse) {
        return cachedResponse;
      }
      // Jeśli nie, wykonaj zapytanie sieciowe
      return fetch(event.request);
    })
  );
});
