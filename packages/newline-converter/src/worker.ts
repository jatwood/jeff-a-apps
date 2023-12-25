chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: "index.html" });
});

chrome.commands.onCommand.addListener(async (cmd) => {
  if (cmd === "copy-json") {
    chrome.tabs.create({ url: "shortcut.html" });
  } else if (cmd === "copy-sql") {
    chrome.tabs.create({ url: "shortcut.html?conversion-type=sql" });
  }
});
