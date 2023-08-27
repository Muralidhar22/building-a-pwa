const assets = ["/","styles.css", "app.js", "sw-register.js", "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"];

self.addEventListener("install", event => {
    event.waitUtil(
        caches.open("assets").then(cache => {
            cache.addAll(assets);
        })
    );
});

self.addEventListener("fetch",async (event) => {
    event.respondWith(
        caches.open("assets").then(cache => {
           return cache.match(event.request).then(cachedResponse => {
                if(cachedResponse) {
                    // It's a cache HIT
                    return cachedResponse;
                } else {
                    // It's a cache MISS
                    return fetch(event.request);
                }
            })
        })
    )
})