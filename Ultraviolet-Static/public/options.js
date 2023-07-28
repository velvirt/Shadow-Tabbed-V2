function settingoptions() {
    var iframeContainer = document.createElement('div');
    iframeContainer.setAttribute('id', 'iframeContainer');
    iframeContainer.style.display = 'flex';
    iframeContainer.style.position = 'fixed';
    iframeContainer.style.top = '0';
    iframeContainer.style.left = '0';
    iframeContainer.style.width = '100%';
    iframeContainer.style.height = '100%';
    iframeContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    iframeContainer.style.zIndex = '9999';

    var iframeBox = document.createElement('div');
    iframeBox.setAttribute('id', 'iframeBox');
    iframeBox.style.position = 'relative';
    iframeBox.style.margin = 'auto';
    iframeBox.style.width = '80%';
    iframeBox.style.backgroundColor = '';
    iframeBox.style.border = '1px solid #ccc';
    iframeBox.style.borderRadius = '5px';
    iframeBox.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';

    var closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '5px';
    closeButton.style.right = '5px';
    closeButton.style.padding = '5px 10px';
    closeButton.style.backgroundColor = '#ccc';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '50%';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = function() {
        document.body.removeChild(iframeContainer);
    };

    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', '/settings/');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '100%');

    iframeBox.appendChild(closeButton);
    iframeBox.appendChild(iframe);
    iframeContainer.appendChild(iframeBox);

    document.body.appendChild(iframeContainer);
}
