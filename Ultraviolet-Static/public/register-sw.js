"use strict";

const stockSW = "/uv/sw.js";
const isServiceWorkerSupported = 'serviceWorker' in navigator;

async function registerSW() {
  if (!isServiceWorkerSupported) {
    throw new Error("Your browser doesn't support service workers.");
  }

  if (location.protocol !== "https:" && !isLocalhost()) {
    throw new Error("Service workers can only be registered under HTTPS protocol.");
  }

  await navigator.serviceWorker.register(stockSW, {
    scope: __uv$config.prefix,
  });
}

function isLocalhost() {
  return (
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    location.hostname.startsWith("192.168.")
  );
}

// Call the function to register the service worker
registerSW()
  .catch((error) => {
    console.error(error);
  });
