import "./AskClipboardPermissions.js";
import { AskClipboardPermissionsChangeEvent } from "./AskClipboardPermissions.js";

const currentTab = await chrome.tabs.getCurrent();

if (!currentTab) {
  document
    .querySelectorAll('button[data-role="enable-clipboard-permissions"]')
    .forEach((button) => {
      if (button instanceof HTMLButtonElement) {
        button.addEventListener("click", () => {
          chrome.tabs.create({ url: "extension/permissions.html" });
        });
      }
    });
} else {
  const asker = document.getElementById("perms-asker");
  asker?.addEventListener("clipboard-permissions-change", (ev) => {
    if (ev instanceof AskClipboardPermissionsChangeEvent) {
      console.log(ev.clipboardText);
    }
  });
}
