const commandToUrl = {
  "search-wikipedia": "https://en.wikipedia.org/wiki/Special:Search?search=",
  "search-jisho": "https://jisho.org/search/",
  "search-psu-lib": "https://libraries.psu.edu/search/all/",
  "search-mdbg": "https://www.mdbg.net/chinese/dictionary?wdqb="
};

const commandToUrlToActionType = {
  "search-wikipedia": "wikipedia",
  "search-jisho": "japanese-jisho",
  "search-psu-lib": "book",
  "search-mdbg": "chinese-mdbg"
};

function saveToStorage(command, selectedText) {
  const actionType = commandToUrlToActionType[command] || 'unknown';
  const url = commandToUrl[command] + encodeURIComponent(selectedText);
  const timestamp = new Date().toISOString();

  const logEntry = { timestamp, selectedText, actionType, url };

  chrome.storage.local.get({ logs: [] }, (data) => {
    const logs = data.logs;
    logs.push(logEntry);
    chrome.storage.local.set({ logs });
  });
}

chrome.commands.onCommand.addListener((command) => {
  if (!(command in commandToUrl)) return;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        func: () => window.getSelection().toString()
      },
      (results) => {
        const selectedText = results[0]?.result.trim().toLowerCase();
        if (selectedText) {
          const url = commandToUrl[command] + encodeURIComponent(selectedText);
          chrome.tabs.create({ url });

          saveToStorage(command, selectedText);
        }
      }
    );
  });
});
