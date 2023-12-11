export class AskClipboardPermissionsChangeEvent extends Event {
  clipboardText: string | undefined;
  constructor(clipboardText: string | undefined) {
    super("clipboard-permissions-change");
    this.clipboardText = clipboardText;
  }
}

/**
 * Triggers a prompt for clipboard permissions and renders slots based on the current permission state.
 */
class AskClipboardPermissions extends HTMLElement {
  _internals: ElementInternals;
  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  set state(permissionState: PermissionState) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customStateSet = (this._internals as any).states as any;
    if (permissionState === "prompt") {
      customStateSet.add("--prompt");
      customStateSet.delete("--denied");
      customStateSet.delete("--granted");
    } else if (permissionState === "denied") {
      customStateSet.delete("--prompt");
      customStateSet.add("--denied");
      customStateSet.delete("--granted");
    } else if (permissionState === "granted") {
      customStateSet.delete("--prompt");
      customStateSet.delete("--denied");
      customStateSet.add("--granted");
    }
  }

  async queryText() {
    try {
      const clipboardText = await navigator.clipboard.readText();
      this.dispatchEvent(new AskClipboardPermissionsChangeEvent(clipboardText));
    } catch (e) {
      this.dispatchEvent(new AskClipboardPermissionsChangeEvent(undefined));
    }
  }

  async connectedCallback() {
    const permissionStatus = await navigator.permissions.query({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      name: "clipboard-read" as any,
    });
    this.state = permissionStatus.state;
    this.queryText();
    permissionStatus.addEventListener("change", () => {
      this.state = permissionStatus.state;
    });
  }
}

export default AskClipboardPermissions;

customElements.define("ask-clipboard-permissions", AskClipboardPermissions);
