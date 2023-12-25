const template = document.createElement("template");
const styles = document.createElement("style");
styles.textContent = `
.hidden {
    display: none;
}
`;
template.content.appendChild(styles);
const container = document.createElement("div");
container.setAttribute("class", "hidden");
container.setAttribute("id", "container");
const body = document.createElement("slot");
body.setAttribute("name", "body");
container.appendChild(body);
template.content.appendChild(container);

class IfPrompt extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "closed" });
    shadowRoot.appendChild(template.content.cloneNode(true));

    const container = shadowRoot.getElementById("container");
    container?.setAttribute("class", "hidden");

    const permissionStatus = await navigator.permissions.query({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      name: "clipboard-read" as any,
    });
    if (permissionStatus.state === "prompt") {
      container?.setAttribute("class", "");
    }
    permissionStatus.addEventListener("change", () => {
      if (permissionStatus.state === "prompt") {
        container?.setAttribute("class", "");
      } else {
        container?.setAttribute("class", "hidden");
      }
    });
  }
}

customElements.define("if-prompt", IfPrompt);

export default IfPrompt;
