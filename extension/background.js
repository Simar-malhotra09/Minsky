const commandToUrl = {
  "search-wikipedia": "https://en.wikipedia.org/wiki/Special:Search?search=",
  "search-jisho": "https://jisho.org/search/",
  "search-psu-lib": "https://libraries.psu.edu/search/all/"
};

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
        }
      }
    );
  });
});
