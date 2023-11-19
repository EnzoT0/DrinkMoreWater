// content.js
function grayscale() {
    const elements = document.getElementsByTagName("*");
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const style = getComputedStyle(element);
  
      if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
        element.style.backgroundColor = 'gray';
      }
  
      if (style.color && style.color !== 'rgba(0, 0, 0, 0)') {
        element.style.color = 'gray';
      }
    }
  }
  
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === "clicked_browser_action") {
        grayscale();
      }
    }
  );


  // Check the user's preference from storage
chrome.storage.sync.get('darkMode', function(data) {
  if (data.darkMode) {
    enableDarkMode();
  }
});

// Toggle dark mode when the user clicks the extension icon
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.storage.sync.get('darkMode', function(data) {
    // Toggle the value
    chrome.storage.sync.set({ 'darkMode': !data.darkMode });
    // Apply or remove dark mode styles based on the new value
    if (!data.darkMode) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });
});

function enableDarkMode() {
  document.documentElement.classList.add('dark-mode');
}

function disableDarkMode() {
  document.documentElement.classList.remove('dark-mode');
}
  