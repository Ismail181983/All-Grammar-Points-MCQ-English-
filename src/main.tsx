import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register PWA service worker to cache assets and enable offline capabilities
if ('serviceWorker' in navigator) {
  registerSW({
    immediate: true,
    onNeedRefresh() {
      console.log('PWA: New content available, updated in background.');
    },
    onOfflineReady() {
      console.log('PWA: Application cached and ready for offline use.');
    },
    onRegisterError(error) {
      console.warn('PWA: Service worker registration error:', error);
    },
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
