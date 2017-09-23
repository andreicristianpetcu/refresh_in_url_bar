'use strict';

browser.pageAction.onClicked.addListener(function(){
  browser.tabs.query({active: true, currentWindow: true}).then((activeTab) => {
    browser.tabs.reload(activeTab.id);
  });
});

browser.tabs.onCreated.addListener((tab) => {
  browser.pageAction.show(tab.id);
});

browser.tabs.query({}).then((tabs) => {
  tabs.forEach((tab) => browser.pageAction.show(tab.id));
});
