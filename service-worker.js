'use strict'

// Update cache names any time any of the cached files change.
const VERSION = '0.9.X'
const CACHE_NAME = 'static-cache-v' + VERSION

// Add list of files to cache here.
const FILES_TO_CACHE = [
	'/',
	'/index.html',
	'/manifest.json',
	'/CSS/main.css',
	'/ICONS/favicon.ico',
	//'/ICONS/icon-144x144.png',
	'/ICONS/icon-152x152.png',
	'/SRC/app.js',
	'/SRC/appFactory.js',
	'/SRC/pagePainter.js',
	'/SRC/actions/beatTaker.js',
	'/SRC/actions/metronome.js',
	'/SRC/actions/tuner.js',
	'/SRC/actions/index.js',
	'/SRC/workshops/input.js',
	'/SRC/workshops/select.js',
	'/SRC/workshops/beat.js',
	'/SRC/workshops/audio.js',
	'/SRC/workshops/workshopIndex.js',
]

self.addEventListener('install', evt => {
	//console.log('[ServiceWorker] Install')
	// Precache static resources here.
	evt.waitUntil(
		caches.open(CACHE_NAME).then(cache => {
			//console.log('[ServiceWorker] Pre-caching offline page')
			return cache.addAll(FILES_TO_CACHE)
		})
	)

	self.skipWaiting()
})

self.addEventListener('activate', evt => {
	//console.log('[ServiceWorker] Activate')
	// Remove previous cached data from disk.
	evt.waitUntil(
		caches.keys().then(keyList => {
			return Promise.all(
				keyList.map(key => {
					if (key !== CACHE_NAME) {
						//console.log('[ServiceWorker] Removing old cache', key)
						return caches.delete(key)
					}
				})
			)
		})
	)

	self.clients.claim()
})

self.addEventListener('fetch', evt => {
	//console.log('[ServiceWorker] Fetch', evt.request.url)
	// Add fetch event handler here.
	evt.respondWith(
		caches.open(CACHE_NAME).then(cache => {
			return cache
				.match(evt.request)
				.then(response => {
					return response || fetch(evt.request)
				})
				.catch(error => {})
		})
	)
})

self.addEventListener('message', function(event) {
	event.source.postMessage(VERSION)
})
