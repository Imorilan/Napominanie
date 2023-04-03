const cacheName = "napominanie";
const staticAssets = [
    "/napominanie/",
    "/napominanie/index.html",
    "/napominanie/js/app.js",
    "/napominanie/icons/icon.png"
];

self.addEventListener("install", async (event) => {
    console.log('install called');
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
});
self.addEventListener("fetch", (event) => {
    console.log('fetch request: ' + event.request.url);
    const req = event.request;
    event.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(req);
    return cachedResponse || fetch(req);
}