// sw.js — Service Worker for PRIMA Queue
self.addEventListener("install", function(e){
  self.skipWaiting();
});
self.addEventListener("activate", function(e){
  e.waitUntil(clients.claim());
});

// Listen for push messages from server (future)
self.addEventListener("push", function(e){
  var data = e.data ? e.data.json() : {};
  e.waitUntil(
    self.registration.showNotification(data.title || "PRIMA Queue", {
      body   : data.body || "",
      icon   : "prima.png",
      badge  : "prima.png",
      vibrate: [200,100,200],
      tag    : "prima-queue",
      renotify: true,
      data   : data
    })
  );
});

// Handle notification click — open the app
self.addEventListener("notificationclick", function(e){
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type:"window" }).then(function(list){
      for(var i=0;i<list.length;i++){
        if(list[i].url.indexOf("queue-status") !== -1){
          return list[i].focus();
        }
      }
      return clients.openWindow("queue-status.html");
    })
  );
});

// Background polling via setInterval won't work in SW
// Instead use periodic sync (Chrome Android only) or client-side keepalive
self.addEventListener("message", function(e){
  if(e.data && e.data.type === "NOTIFY"){
    self.registration.showNotification(e.data.title, {
      body   : e.data.body,
      icon   : "prima.png",
      badge  : "prima.png",
      vibrate: [200,100,200],
      tag    : "prima-queue",
      renotify: true
    });
  }
});
