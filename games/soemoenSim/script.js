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
  const obj = JSON.parse(str);
  for (let i in obj) {
    if (typeof obj[i] == "string") {
      s[i] = new Decimal(obj[i])
    }
  }
}
buttons.beg.addEventListener("click", function () {
  s.itemsBegged = s.itemsBegged.add("1")
})
function save() {
  localStorage.setItem("saveSoemoenSim", JSON.stringify(s))
}
function update() {
  mainCurrency.innerHTML = `You've begged for ${e.HTMLPresets.MixedScientific.format(s.itemsBegged)} items.`
}
function updateTitle() {
  windowTitle.innerHTML = `py_alt simulator | ${e.Presets.MixedScientific.format(s.itemsBegged)} items begged`
}
setInterval(update, 15)
setInterval(updateTitle, 100);
setInterval(save, 1000)