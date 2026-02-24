/* Service Worker - Offline cache */
// Bump this whenever you deploy to force clients to update cached assets
const CACHE = "health-tracker-cache-v10-autosave-5";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (event)=>{
  event.waitUntil((async ()=>{
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event)=>{
  event.waitUntil((async ()=>{
    const keys = await caches.keys();
    await Promise.all(keys.map(k => (k !== CACHE) ? caches.delete(k) : Promise.resolve()));
    self.clients.claim();
  })());
});

self.addEventListener("fetch", (event)=>{
  const req = event.request;
  const url = new URL(req.url);
  if(url.origin !== self.location.origin) return;

  event.respondWith((async ()=>{
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req);
    if(cached) return cached;

    try{
      const fresh = await fetch(req);
      if(req.method === "GET" && fresh && fresh.status === 200){
        cache.put(req, fresh.clone());
      }
      return fresh;
    }catch(e){
      if(req.mode === "navigate"){
        const fallback = await cache.match("./index.html");
        if(fallback) return fallback;
      }
      throw e;
    }
  })());
});
