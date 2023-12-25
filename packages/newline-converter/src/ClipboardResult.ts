const templateStyles = `
    .success {
        color: var(--color-success-green);
        font-size: var(--font-size-success);
    }
    .error {
        color: var(--color-error-red);
        font-size: var(--font-size-error);
    }
    .hidden {
        display: none;
    }
`;
const templateStyle = document.createElement("style");
templateStyle.textContent = templateStyles;

const successSlotContainer = document.createElement("div");
successSlotContainer.setAttribute("class", "success hidden");
const successSlot = document.createElement("slot");
successSlot.setAttribute("name", "success");
successSlotContainer.appendChild(successSlot);

const errorSlotContainer = document.createElement("div");
errorSlotContainer.setAttribute("class", "error hidden");
const errorSlot = document.createElement("slot");
errorSlot.setAttribute("name", "error");
errorSlotContainer.appendChild(errorSlot);

const template = document.createElement("template");
template.content.append(
  templateStyle,
  successSlotContainer,
  errorSlotContainer
);

class ClipboardResult extends HTMLElement {
  body: ShadowRoot;
  constructor() {
    super();
    this.body = this.attachShadow({ mode: "closed" });
    const templateContent = template.content;
    this.body.appendChild(templateContent.cloneNode(true));
    this.state = undefined;
  }

  set state(state: "SUCCESS" | "ERROR" | undefined) {
    const successContainerClasses = [
      "success",
      state !== "SUCCESS" ? "hidden" : undefined,
    ]
      .filter((cls) => cls)
      .join(" ");
    const errorContainerClasses = [
      "error",
      state !== "ERROR" ? "hidden" : undefined,
    ]
      .filter((cls) => cls)
      .join(" ");
    this.body
      .querySelector(".success")
      ?.setAttribute("class", successContainerClasses);
    this.body
      .querySelector(".error")
      ?.setAttribute("class", errorContainerClasses);
  }
}

export default ClipboardResult;

customElements.define("clipboard-result", ClipboardResult);
