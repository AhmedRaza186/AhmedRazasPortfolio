import { precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';

clientsClaim();
self.skipWaiting();

// self.__WB_MANIFEST is injected by vite-plugin-pwa
precacheAndRoute(self.__WB_MANIFEST || []);
