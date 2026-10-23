document.getElementById("options-import").addEventListener("click", () => {
  try {
    decodeSave(prompt("Import your save"))
  } catch (err) {
    alert(`Failed to decode save: ${err}`)
  }
});
async function writeClipboardText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error(error.message);
  }
}
document.getElementById("options-export").addEventListener("click", () => writeClipboardText(btoa(JSON.stringify(player))));
document.getElementById("options-hardreset").addEventListener("click", () => {
  if (confirm("Are you sure you want to reset everything?")) {
    player = defaults;
    localStorage.removeItem("bulkedRollsSave");
    location.reload();
  }
})