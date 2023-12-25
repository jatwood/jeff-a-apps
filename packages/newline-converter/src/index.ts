import ClipboardResult from "./ClipboardResult.js";
import {
  convertToJSONAndCopy,
  convertToSQLAndCopy,
  setClipboardResultState,
} from "./utils.js";

const form = document.querySelector('form[name="pasteForm"]');
if (!(form instanceof HTMLFormElement)) {
  throw new Error();
}

form.addEventListener("submit", async (ev) => {
  try {
    ev.preventDefault();
    if (!(ev.target instanceof HTMLFormElement)) {
      throw new Error();
    }
    const inputElem = document.querySelector('textarea[name="list"]');
    if (!(inputElem instanceof HTMLTextAreaElement)) {
      throw new Error();
    }
    const value = inputElem.value;
    const typeElem = document.getElementById("conversion-type");
    if (!(typeElem instanceof HTMLSelectElement)) {
      throw new Error();
    }
    if (typeElem.value === "json") {
      await convertToJSONAndCopy(value);
    } else if (typeElem.value === "sql") {
      await convertToSQLAndCopy(value);
    }

    setClipboardResultState("SUCCESS");
  } catch (e) {
    setClipboardResultState("ERROR");
  }

  // TODO parsing options
});

const inputElem = document.querySelector('textarea[name="list"]');
if (!(inputElem instanceof HTMLTextAreaElement)) {
  throw new Error();
}

const clipboardResultElems = document.querySelectorAll("clipboard-result");
clipboardResultElems.forEach((elem) => {
  if (!(elem instanceof ClipboardResult)) {
    return;
  }
  const successSlot = document.createElement("div");
  successSlot.setAttribute("slot", "success");
  successSlot.appendChild(
    new Text("The list was formatted and copied to your clipboard.")
  );

  const errorSlot = document.createElement("div");
  errorSlot.setAttribute("slot", "error");
  errorSlot.appendChild(
    new Text(
      "There was an unexpected error. Please check the formatting and try again."
    )
  );

  elem.append(successSlot, errorSlot);
});

inputElem.addEventListener("change", () => {
  clipboardResultElems.forEach((elem) => {
    if (!(elem instanceof ClipboardResult)) {
      return;
    }

    elem.state = undefined;
  });
});
