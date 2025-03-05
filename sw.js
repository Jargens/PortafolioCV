/*
Service Worker para una Progressive Web App (PWA)
Este script gestiona la caché de la aplicación para permitir su funcionamiento offline.
*/

console.log('Estoy en el SW');

// Nombre de la caché
const CACHE_NAME = "vi_cache_PWA";

// Recursos a cachear
var urlsToCache = [
    './',
    './index.html',
    './css/styles.css',
    './js/app.js',
    './imagenes/estacionamiento.png',
    './imagenes/flores.jpg',
    './imagenes/icono_fuego.jpg',
    './imagenes/icono16.jpg',
    './imagenes/icono32.jpg',
    './imagenes/icono64.jpg',
    './imagenes/icono96.jpg',
    './imagenes/icono128.jpg',
    './imagenes/icono144.jpg',
    './imagenes/icono192.jpg',
    './imagenes/icono240.jpg',
    './imagenes/icono256.jpg',
    './imagenes/icono384.jpg',
    './imagenes/icono512.jpg',
    './imagenes/icono1024.jpg',
    './imagenes/unity.png'
];

/*
Instalación del Service Worker
Se encarga de abrir la caché y almacenar los recursos especificados.
*/
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierta');
                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting(); // Fuerza la activación del nuevo SW
                    });
            })
            .catch(err => {
                console.log("No se ha cargado la cache", err);
            })
    );
});

/*
Activación del Service Worker
Se encarga de eliminar versiones antiguas de la caché.
*/
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Eliminando caché antigua:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim()) 
    );
});

self.addEventListener('fetch',e=>{
    e.respondWith(
        caches.match(e.request)
            .then(res=>{
                if(res){
                    return res;
                }
                return fetch(e.request);
            })
    )
})



