'use strict';

browser.pageAction.onClicked.addListener(function(){
  browser.tabs.query({active: true, currentWindow: true}).then((activeTab) => {
    browser.tabs.reload(activeTab.id);
  });
});

browser.tabs.onUpdated.addListener((id, changeInfo, tabInfo) => {
    browser.pageAction.show(tabInfo.id);
});

browser.tabs.query({}).then((tabs) => {
  var tab;
  for (tab of tabs) {
    browser.pageAction.show(tab.id);
  }
});