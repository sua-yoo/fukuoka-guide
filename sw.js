'use strict';
const VERSION='a03b36ae16458d71';
const BASE=new URL('./',self.location.href);
const PREFIX='fukuoka-guide:'+BASE.pathname+':';
const CACHE=PREFIX+VERSION;
const INDEX=new URL('index.html',BASE).href;
const ASSETS=["index.html", "pwa.js", "pwa.css", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png"].map(path=>new URL(path,BASE).href);
const ALLOWED=new Set(ASSETS);
async function saveApp(){const cache=await caches.open(CACHE);await cache.addAll(ASSETS.map(url=>new Request(url,{cache:'reload'})));}
async function offlineStatus(){const cache=await caches.open(CACHE);const hits=await Promise.all(ASSETS.map(url=>cache.match(url)));return {ready:hits.every(Boolean),version:VERSION};}
self.addEventListener('install',event=>event.waitUntil(saveApp()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);await self.clients.claim();})()));
self.addEventListener('message',event=>{const reply=data=>{if(event.ports&&event.ports[0])event.ports[0].postMessage(data);};if(event.data&&event.data.type==='SKIP_WAITING'){event.waitUntil(self.skipWaiting());return;}if(!event.data||!['OFFLINE_STATUS','CACHE_APP'].includes(event.data.type))return;event.waitUntil((async()=>{try{if(event.data.type==='CACHE_APP')await saveApp();reply(await offlineStatus());}catch(error){reply({ready:false,error:String(error)});}})());});
self.addEventListener('fetch',event=>{const request=event.request;if(request.method!=='GET')return;const url=new URL(request.url);if(url.origin!==BASE.origin)return;const canonical=url.origin+url.pathname;const appNavigation=request.mode==='navigate'&&(url.pathname===BASE.pathname||canonical===INDEX);if(!appNavigation&&!ALLOWED.has(canonical))return;const key=appNavigation?INDEX:canonical;event.respondWith((async()=>{const cache=await caches.open(CACHE);const cached=await cache.match(key);if(cached)return cached;try{const response=await fetch(request);if(response.ok){try{await cache.put(key,response.clone());}catch{}}return response;}catch{if(appNavigation)return new Response('<!doctype html><html lang="ko"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>후쿠오카 가족여행</title><p>가이드가 아직 저장되지 않았습니다. 인터넷에 연결한 뒤 다시 열어주세요.</p></html>',{status:503,headers:{'Content-Type':'text/html; charset=utf-8'}});return Response.error();}})());});
