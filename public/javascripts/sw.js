(global => {
  'use strict';

  //서비스워커로 클라이언트 id, password딸 수 있지 않나?
  importScripts('/node_modules/sw-toolbox/sw-toolbox.js');

  //Strategy
  global.toolbox.router.get('/api/', global.toolbox.networkFirst, {
    cache: {
      name: 'api',
      maxEntries: 10,
      maxAgeSeconds: 86400
    },
    origin: /localhost:3000/,
    networkTimeoutSeconds: 1
  });

  global.addEventListener('install', event => {
    event.waitUntil(global.skipWaiting())
  });
  global.addEventListener('activate', event => {
    event.waitUntil(global.clients.claim())
  });

  global.toolbox.options.debug = true;
  global.toolbox.router.default = global.toolbox.networkFirst;
})(self);