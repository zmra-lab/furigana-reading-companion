// ZMRA Language Companion - Background Service Worker
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'zmra-annotate-selection',
    title: '使用 ZMRA 添加振假名/拼音注音',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'zmra-annotate-selection' && tab?.id) {
    chrome.tabs.sendMessage(tab.id, {
      action: 'ANNOTATE_SELECTION',
      text: info.selectionText
    });
  }
});
