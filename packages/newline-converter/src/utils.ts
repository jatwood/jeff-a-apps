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

function splitLines(txt: string) {
  return txt
    .split(/[\r\n]+/)
    .map((line) => line.trim())
    .filter((str) => str);
}

export async function convertToJSONAndCopy(txt: string) {
  const lines = splitLines(txt);

  await navigator.clipboard.writeText(JSON.stringify(lines));
}

export async function convertToSQLAndCopy(txt: string) {
  const lines = splitLines(txt);
  await navigator.clipboard.writeText(
    `(${lines.map((line) => `'${line}'`).join(",")})`
  );
}
