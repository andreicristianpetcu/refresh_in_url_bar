'use strict';

browser.pageAction.onClicked.addListener(reloadTab);

// Reload or stop the page depending on the status
function reloadTab(tab) {
  if (tab.status === 'complete') {
    browser.tabs.reload(tab.id);
  }
  else {
    browser.tabs.executeScript({code: "window.stop()", runAt: "document_start"});
  }
};

// Update the icons depending if page is loading or loaded
browser.tabs.onUpdated.addListener((id, changeInfo, tabInfo) => {
    if (tabInfo.status === 'complete') {
      browser.pageAction.setIcon({tabId: id, path: "images/refresh.svg"});
      browser.pageAction.setTitle({tabId: id, title: "Reload current page (Ctrl+R)"});
    }
    else {
      browser.pageAction.setIcon({tabId: id, path: "images/cancel.svg"});
      browser.pageAction.setTitle({tabId: id, title: "Stop page load"});
      
    }
    browser.pageAction.show(tabInfo.id);
});

// Add icon in navigation bar
browser.tabs.query({}).then((tabs) => {
  var tab;
  for (tab of tabs) {
  	browser.pageAction.setTitle({tabId: tab.id, title: "Reload current page (Ctrl+R)"});
    browser.pageAction.show(tab.id);
  }
});
