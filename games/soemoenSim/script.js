const windowTitle = document.head.getElementsByTagName("title")[0];
const mainCurrency = document.getElementById("mainCurrency");
const buttons = {
  beg: "beg",
  import: "importData",
  export: "exportData"
};
for (let i in buttons) {
  buttons[i] = document.getElementById(buttons[i])
}
const e = EternalNotations;
const s = {
  itemsBegged: new Decimal("0")
};
if (localStorage.getItem("saveSoemoenSim")) {
  try {
    importSave(localStorage.getItem("saveSoemoenSim"))
  } catch (e) {
    mainCurrency.innerHTML = e.stack
  }
};
function importSave(str) {
  const obj = JSON.parse(atob(str));
  for (let i in obj) {
    if (typeof s[i] == "string") {
      s[i] = new Decimal(obj[i])
    }
  }
}
buttons.beg.addEventListener("click", function () {
  s.itemsBegged = s.itemsBegged.add("1")
})
buttons.import.addEventListener("click", function () {
  const input = atob(document.getElementById("saveText").innerText);
  try {
    importSave(input);
    localStorage.setItem("saveSoemoenSim", input)
  } catch (e) {
    alert("An error occurred while importing this save")
  }
})
buttons.export.addEventListener("click", () => writeClipboardText(btoa(JSON.stringify(s))));
async function writeClipboardText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    console.error(e.message);
  }
}
function save() {
  localStorage.setItem("saveSoemoenSim", btoa(JSON.stringify(s)))
}
function update() {
  mainCurrency.innerHTML = `You've begged for ${e.HTMLPresets.MixedScientific.format(s.itemsBegged)} items.`
  windowTitle.innerHTML = `py_alt simulator | ${e.Presets.MixedScientific.format(s.itemsBegged)} items begged`
}
setInterval(update, 50);
setInterval(save, 2500)