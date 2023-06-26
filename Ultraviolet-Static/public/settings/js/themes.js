ent.addEventListener("DOMContentLoaded", function() {
    var storedTheme = localStorage.getItem("themes");
    var defaultCSSPath = "/CSS/index.css";
    var cssLink = document.getElementById("themeStylesheet");
    cssLink.href = storedTheme || defaultCSSPath;
  });
  
  function changeTheme(cssFilePath) {
    var cssLink = document.getElementById("themeStylesheet");
    cssLink.href = cssFilePath;
    window.parent.localStorage.setItem("themes", cssFilePath);
    var message = {
      theme: themePath
    };
    window.parent.postMessage(message, "*");
  }  

