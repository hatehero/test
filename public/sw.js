const CACHE_NAME="hatehero-v1";
const APP_SHELL=["/","/manifest.json","/icons/icon-192.png","/icons/icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  const u=new URL(e.request.url);
  if(u.origin!==self.location.origin) return;
  if(e.request.mode==="navigate"){
    e.respondWith(fetch(e.request).catch(()=>caches.match("/")));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    if(res.ok&&res.type==="basic"){const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,copy));}
    return res;
  })));
});
