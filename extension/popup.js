document.getElementById('download').addEventListener('click', () => {
  chrome.storage.local.get({ logs: [] }, (data) => {
    const logs = data.logs;

    if (!logs.length) {
      alert('No logs to export.');
      return;
    }

    // CSV headers
    let csvContent = "timestamp,selectedText,actionType,url\n";

    // Add rows
    logs.forEach(entry => {
      const row = `"${entry.timestamp}","${entry.selectedText}","${entry.actionType}","${entry.url}"\n`;
      csvContent += row;
    });

    // Create Blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'search_log.csv';
    a.click();

    URL.revokeObjectURL(url); // Cleanup
  });
});

fetch(chrome.runtime.getURL("hotkeys_config.json"))
  .then(res => res.json())
  .then(hotkeys => {
    const table = document.createElement("table");
    
    // header row

    const header = document.createElement("tr");
    header.innerHTML = "<th>Description</th><th>Mac Key</th>";
    table.appendChild(header);

    // Add rows for each hotkey (fields 1 and 3)
    hotkeys.forEach(hk => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${hk.desc}</td>
        <td>${hk.suggestedKeyMac || ""}</td>
      `;
      table.appendChild(row);
    });

    document.body.appendChild(table);
  });
