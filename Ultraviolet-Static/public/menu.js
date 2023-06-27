document.addEventListener("DOMContentLoaded", function() {
  var customMenu = document.getElementById("custom-menu");
  var body = document.getElementById("body");

  document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
    selectedText = window.getSelection().toString();  
    customMenu.style.left = e.clientX + "px";
    customMenu.style.top = e.clientY + "px";
    customMenu.style.display = "block";
  });

  document.addEventListener("click", function(e) {
    customMenu.style.display = "none";
  });
});

function copy() {
  navigator.clipboard.writeText(selectedText);
  }

  async function paste() {
      const activeElement = document.activeElement;
      const text = await navigator.clipboard.readText();
      activeElement.value = text;

  }
  