"use strict";

(function () {
  const stockSW = "/uv/sw.js";
  const isServiceWorkerSupported = 'serviceWorker' in navigator;

  async function registerSW() {
    if (!isServiceWorkerSupported) {
      throw new Error("Your browser doesn't support service workers.");
    }

    if (location.protocol === "https:" || isLocalhost()) {
      await navigator.serviceWorker.register(stockSW, {
        scope: __uv$config.prefix,
      });
    } else {
      throw new Error("Service workers cannot be registered without https.");
    }
  }

  function isLocalhost() {
    return (
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1" ||
      location.hostname.startsWith("192.168.")
    );
  }

  registerSW();
})();
