import ClipboardResult from "./ClipboardResult.js";
import { convertToJSONAndCopy, setClipboardResultState } from "./utils.js";
import "./IfPrompt.js";

const ifPromptBodySlot = document.querySelector(
  'if-prompt section[slot="body"]'
);
ifPromptBodySlot?.setAttribute("style", "");

const clipboardResultElems = document.querySelectorAll("clipboard-result");
clipboardResultElems.forEach((elem) => {
  if (!(elem instanceof ClipboardResult)) {
    return;
  }
  const successSlot = document.createElement("div");
  successSlot.setAttribute("slot", "success");
  successSlot.appendChild(
    new Text(
      "The list was copied to your clipboard as JSON. You may close this tab."
    )
  );

  const errorSlot = document.createElement("div");
  errorSlot.setAttribute("slot", "error");
  errorSlot.appendChild(
    new Text(
      "Could not read from the clipboard. Please grant permission for Newline Converter to read your clipboard in order to enable the JSON conversion shortcut."
    )
  );

  elem.append(successSlot, errorSlot);
});

try {
  const txt = await navigator.clipboard.readText();
  await convertToJSONAndCopy(txt);
  setClipboardResultState("SUCCESS");
} catch (e) {
  setClipboardResultState("ERROR");
  const permissionStatus = await navigator.permissions.query({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name: "clipboard-read" as any,
  });
  permissionStatus.addEventListener("change", async () => {
    if (permissionStatus.state === "granted") {
      const txt = await navigator.clipboard.readText();
      await convertToJSONAndCopy(txt);
      setClipboardResultState("SUCCESS");
    }
  });
}
