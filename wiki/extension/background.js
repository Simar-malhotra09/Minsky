chrome.commands.onCommand.addListener((command) => {
  if (command === "search-wikipedia") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => window.getSelection().toString()
      }, (results) => {
        const selectedText = results[0].result.trim();
        if (selectedText) {
          const url = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(selectedText)}`;
          chrome.tabs.create({ url });
        }
      });
    });
  
  } 

  if (command === "search-jisho") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => window.getSelection().toString()
      }, (results) => {
        const selectedText = results[0].result.trim();
        if (selectedText) {
          const url = `https://jisho.org/search/${encodeURIComponent(selectedText)}`;
          chrome.tabs.create({ url });
        }
      });
    });
  }
});

