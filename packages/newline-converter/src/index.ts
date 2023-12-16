const form = document.querySelector('form[name="pasteForm"]');
if (!(form instanceof HTMLFormElement)) {
  throw new Error();
}

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  if (!(ev.target instanceof HTMLFormElement)) {
    throw new Error();
  }
  const inputElem = document.querySelector('textarea[name="list"]');
  if (!(inputElem instanceof HTMLTextAreaElement)) {
    throw new Error();
  }
  const value = inputElem.value;
  const lines = value
    .split(/[\r\n]+/)
    .map((line) => line.trim())
    .filter((str) => str);

  await navigator.clipboard.writeText(JSON.stringify(lines));

  // TODO parsing options
});
