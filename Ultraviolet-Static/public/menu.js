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
    // Get the text content or value you want to copy
    var textToCopy = "Text to be copied";
  
    // Create a temporary textarea element
    var tempTextarea = document.createElement("textarea");
    tempTextarea.value = textToCopy;
  
    // Append the textarea to the DOM
    document.body.appendChild(tempTextarea);
  
    // Select the text inside the textarea
    tempTextarea.select();
  
    // Copy the selected text to the clipboard
    document.execCommand("copy");
  
    // Remove the temporary textarea from the DOM
    document.body.removeChild(tempTextarea);
  }
  
  function paste() {
    // Create a temporary textarea element
    var tempTextarea = document.createElement("textarea");
  
    // Append the textarea to the DOM
    document.body.appendChild(tempTextarea);
  
    // Focus on the textarea
    tempTextarea.focus();
  
    // Execute the paste command
    document.execCommand("paste");
  
    // Get the pasted content from the textarea
    var pastedContent = tempTextarea.value;
  
    // Remove the temporary textarea from the DOM
    document.body.removeChild(tempTextarea);
  
    // Use the pasted content as needed
    console.log("Pasted content:", pastedContent);
  }
  
  function selectAll() {
    // Get the target element or textarea where you want to select all the text
    var targetElement = document.getElementById("target");
  
    // Select all the text inside the target element
    targetElement.select();
  }
  