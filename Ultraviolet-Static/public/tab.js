const tabsContainer = document.querySelector('.tab-control');
const iframeContainer = document.getElementById('iframe-container');
const closeBtn = document.getElementById('closebtn');
const addBtn = document.querySelector('.open-btn');

let isCloseButtonDisabled = false;
let tabIframeMap = new Map();
let tabCounter = 1;

tabsContainer.addEventListener('click', function(event) {
  const clickedElement = event.target;

  if (clickedElement.classList.contains('tab')) {
    const isActiveTab = clickedElement.classList.contains('active');
    if (!isActiveTab) {
      changeTab(clickedElement);
    }
  } else if (clickedElement.classList.contains('close-btn') && !isCloseButtonDisabled) {
    const tab = clickedElement.parentNode;
    removeTab(tab);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const homeTab = document.querySelector('.tab');
  changeTab(homeTab);
});

function changeTab(selectedTab) {
  const tabs = tabsContainer.querySelectorAll('.tab');

  tabs.forEach(tab => tab.classList.remove('active'));
  selectedTab.classList.add('active');

  const tabId = selectedTab.dataset.tabId;

  if (tabIframeMap.has(tabId)) {
    const iframe = tabIframeMap.get(tabId);
    showIframe(iframe);
  } else {
    if (tabId === 'home') {
      const iframeSrc = 'home.html';
      const iframe = createIframe(iframeSrc);
      tabIframeMap.set(tabId, iframe);
      showIframe(iframe);
    } else {
      const iframeSrc = selectedTab.dataset.src || 'main.html';
      const iframe = createIframe(iframeSrc);
      tabIframeMap.set(tabId, iframe);
      showIframe(iframe);
    }
  }
}

function createIframe(src) {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('src', src);
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.display = 'none';
  iframeContainer.appendChild(iframe);
  return iframe;
}

function showIframe(iframe) {
  iframeContainer.querySelectorAll('iframe').forEach(iframe => {
    iframe.style.display = 'none';
  });
  iframe.style.display = 'block';
}

function removeTab(tab) {
  const isCurrentTab = tab.classList.contains('active');
  const tabId = tab.dataset.tabId;
  const tabs = tabsContainer.querySelectorAll('.tab');
  const tabCount = tabs.length;

  if (isCurrentTab) {
    const previousTab = tab.previousElementSibling;
    const nextTab = tab.nextElementSibling;
    const newActiveTab = previousTab || nextTab;

    if (newActiveTab) {
      changeTab(newActiveTab);
    }
  }

  iframeContainer.removeChild(tabIframeMap.get(tabId));
  tabIframeMap.delete(tabId);
  tab.remove();

  if (tabCount === 1) {
    closeBtn.classList.add('disabled');
    isCloseButtonDisabled = true;
  }

  setTimeout(() => {
    closeBtn.classList.remove('disabled');
    isCloseButtonDisabled = false;
  }, 500);
}

closeBtn.addEventListener('click', function() {
  const activeTab = tabsContainer.querySelector('.tab.active');
  const tabs = tabsContainer.querySelectorAll('.tab');

  if (tabs.length === 1) {
    return;
  }

  if (activeTab) {
    removeTab(activeTab);
  }
});

function addTab() {
  const tabManager = document.querySelector('.tab-manager');
  const tabId = tabCounter++;

  const newTab = document.createElement('div');
  newTab.classList.add('tab');
  newTab.dataset.tabId = tabId;
  newTab.innerHTML = '<i class="fa-solid fa-table-columns fa-lg"></i>Tab';

  const closeBtn = document.createElement('div');
  closeBtn.classList.add('close-btn');
  closeBtn.innerHTML = '<i class="fas fa-times"></i>';
  newTab.appendChild(closeBtn);

  tabManager.insertAdjacentElement('beforebegin', newTab);

  const iframe = createIframe('');
  iframe.dataset.tabId = tabId;
  tabIframeMap.set(tabId, iframe);
}