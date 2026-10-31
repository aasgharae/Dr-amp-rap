const C='amiripour-v2';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
const CDN=['https://cdn.jsdelivr.net/npm/sql.js@1.8.0/dist/sql-wasm.js','https://cdn.jsdelivr.net/npm/sql.js@1.8.0/dist/sql-wasm.wasm'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(async c=>{await c.addAll(CORE);await Promise.all(CDN.map(u=>c.add(u).catch(()=>{})))}));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request).then(m=>m||caches.match('./index.html'))));
});
