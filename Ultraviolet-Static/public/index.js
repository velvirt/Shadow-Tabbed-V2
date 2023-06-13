// Cache DOM elements
const form = document.getElementById("uv-form");
const address = document.getElementById("uv-address");
const searchEngine = document.getElementById("uv-search-engine");
const error = document.getElementById("uv-error");
const errorCode = document.getElementById("uv-error-code");


form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setTimeout(async () => {
    try {
      await registerSW();
    } catch (err) {
      error.textContent = "Failed to register service worker.";
      errorCode.textContent = err.toString();
      throw err;
    }
    
    const url = search(address.value, searchEngine.value);
    localStorage.setItem('site', __uv$config.prefix + __uv$config.encodeUrl(url));
    location.href = "load.html";
    //location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
  }, 0);
});


async function openURL(url) {
  try {
    await registerSW();
  } catch (err) {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }

  localStorage.setItem('site', __uv$config.prefix + __uv$config.encodeUrl(url));
  location.href = "load.html";
}
