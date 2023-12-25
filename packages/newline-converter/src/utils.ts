import ClipboardResult from "./ClipboardResult.js";

export function setClipboardResultState(
  state: "SUCCESS" | "ERROR" | undefined
) {
  const components = document.querySelectorAll("clipboard-result");
  components.forEach((elem) => {
    if (!(elem instanceof ClipboardResult)) {
      return;
    }
    elem.state = state;
  });
}

export async function convertToJSONAndCopy(txt: string) {
  const lines = txt
    .split(/[\r\n]+/)
    .map((line) => line.trim())
    .filter((str) => str);

  await navigator.clipboard.writeText(JSON.stringify(lines));
}
