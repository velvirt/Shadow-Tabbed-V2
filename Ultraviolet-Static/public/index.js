document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("uv-form");
  const address = document.getElementById("uv-address");
  const searchEngine = document.getElementById("uv-search-engine");
  const error = document.getElementById("uv-error");
  const errorCode = document.getElementById("uv-error-code");

  const registerServiceWorker = registerSW().catch((err) => {
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  });

  const handleClick = async (urlValue) => {
    await registerServiceWorker;
  
    const url = search(urlValue, searchEngine.value);
    location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
  };
  
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    await registerServiceWorker;

    const url = search(address.value, searchEngine.value);
    location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
  });

  // Add event listener to the button or element you want to trigger the same behavior
  const button = document.getElementById("discord");
  button.addEventListener("click", async (event) => {
    event.preventDefault();
    await handleClick("discord.com");
  });
});
