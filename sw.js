//Service worker file
'use strict';

var foodCacheName = 'foodCacheV1';
var foodCachePagesName = 'foodCachePageV1';
var foodCacheFiles = [
    'index.html',
    'index.js',
    'main.css',
];

self.addEventListener('install', function(e){
    console.log('From SW: Install Event.', e);
    self.skipWaiting();
    e.waitUntil(
        caches.open(foodCacheName)
        .then(function(cache){
            return cache.addAll(foodCacheFiles);
        })
    );
});

self.addEventListener('activate', function(e){
    console.log('From SW: Activate State.', e);
    self.clients.claim();
    e.waitUntil(
        cache.keys()
        .then(function(cacheKeys){
            let deletePromises = [];
            for(let i = 0; i < cacheKeys.length; i++){
                if(cacheKeys[i] != foodCacheName &&
                    cacheKeys[i] != foodCachePagesName){
                        deletePromises.push(caches.delete(cacheKeys[i]));
                    }
            }
            return Promise.all(deletePromises);
        })  
    )
});
