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
function encodeB64(str) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
  const arr = [];
  let binary = "";
  let output = "";
  for (let i = 0; i < str.length; i++) {
    binary += (str.charCodeAt(i) + 256).toString(2).slice(1)
  };
  if (binary.length % 6 != 0) {
    binary += "0".repeat(6 - binary.length % 6)
  }
  for (let i = 0; i < binary.length / 6; i++) {
    arr[i] = binary.slice(i * 6, i * 6 + 6)
  };
  for (let i in arr) {
    output += alphabet[Number.parseInt(arr[i], 2)]
  }
  return output + (output.length % 4 == 0 ? "" : "=".repeat(4 - output.length % 4))
}
function decodeB64(str) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
  let binary = "";
  let output = "";
  str = str.replace(/=$/g, "");
  for (let i = 0; i < str.length; i++) {
    binary += (alphabet.indexOf(str[i]) + 64).toString(2).slice(1)
  };
  for (let i = 0; i < binary.length / 8; i++) {
    output += String.fromCharCode(Number.parseInt(binary.slice(i * 8, i * 8 + 8), 2))
  };
  return output
}
function importSave(str) {
  const obj = JSON.parse(decodeB64(str).replace(/[\s\x0f]$/, ""));
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
  const input = decodeB64(document.getElementById("saveText").innerText);
  try {
    importSave(input);
    localStorage.setItem("saveSoemoenSim", input)
  } catch (e) {
    alert(`An error occurred while importing this save (debug: ${e.stack})`)
  }
})
buttons.export.addEventListener("click", () => writeClipboardText(encodeB64(JSON.stringify(s))));
async function writeClipboardText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    console.error(e.message);
  }
}
function save() {
  localStorage.setItem("saveSoemoenSim", encodeB64(JSON.stringify(s)))
}
function update() {
  mainCurrency.innerHTML = `You've begged for ${e.HTMLPresets.MixedScientific.format(s.itemsBegged)} items.`
  windowTitle.innerHTML = `py_alt simulator | ${e.Presets.MixedScientific.format(s.itemsBegged)} items begged`
}
setInterval(update, 50);
setInterval(save, 2500)