/// <reference types="vite-plugin-pwa/client" />
import { precacheAndRoute } from "workbox-precaching";

// Zorg ervoor dat TypeScript weet wat __WB_MANIFEST is
declare let self: ServiceWorkerGlobalScope & { __WB_MANIFEST: any };

precacheAndRoute(self.__WB_MANIFEST);
