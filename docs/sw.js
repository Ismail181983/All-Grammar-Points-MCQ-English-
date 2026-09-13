/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-afac4cd2'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "pwa-maskable-512x512.png",
    "revision": "1e4bfab6796d7a6d8521c02b5367b78e"
  }, {
    "url": "pwa-512x512.png",
    "revision": "1e4bfab6796d7a6d8521c02b5367b78e"
  }, {
    "url": "pwa-192x192.png",
    "revision": "9aafc2616544ad4a11b80a8ada70729b"
  }, {
    "url": "index.html",
    "revision": "4fd63bc5f1be5387266370497f5fa8f8"
  }, {
    "url": "favicon.svg",
    "revision": "76bde3f3624fd0997b564f371d1010f0"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "b637c78300320f0af96f011e67abfb49"
  }, {
    "url": "404.html",
    "revision": "b94b0a61865f9410379c9bb84fb7f4a5"
  }, {
    "url": "assets/workbox-window.prod.es5-BBnX5xw4.js",
    "revision": null
  }, {
    "url": "assets/index-PuDQ4u_Y.js",
    "revision": null
  }, {
    "url": "assets/index-DSd0K3OD.css",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "b637c78300320f0af96f011e67abfb49"
  }, {
    "url": "favicon.svg",
    "revision": "76bde3f3624fd0997b564f371d1010f0"
  }, {
    "url": "pwa-192x192.png",
    "revision": "9aafc2616544ad4a11b80a8ada70729b"
  }, {
    "url": "pwa-512x512.png",
    "revision": "1e4bfab6796d7a6d8521c02b5367b78e"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "1e4bfab6796d7a6d8521c02b5367b78e"
  }, {
    "url": "manifest.webmanifest",
    "revision": "7c847f1bd2076d00e87a1fddcde75280"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "google-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 15,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i, new workbox.CacheFirst({
    "cacheName": "gstatic-fonts-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 30,
      maxAgeSeconds: 31536000
    }), new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    })]
  }), 'GET');

}));
