function processCol(colorInfo) {
  if (colorInfo instanceof Array) {
    const gradients = [];
    for (let i of colorInfo) {
      gradients.push(`${i[0].startsWith("r") ? "repeating-" : ""}linear-gradient(${i[0].replace(/r/g, "")}deg,${i.slice(1).join(",")})`);
    };
    return gradients.join(",")
  } else {
    return colorInfo;
  }
}
function getStyle(colorInfo, forRarityBox = false) {
  if (forRarityBox) {
    return colorInfo instanceof Array ?
      `linear-gradient(to bottom,#000000c0,#000000d0),${processCol(colorInfo)}` :
      `linear-gradient(to bottom,#000000c0,#000000d0),linear-gradient(0deg,${colorInfo})`
  }
  return colorInfo instanceof Array ?
    `background:${processCol(colorInfo)}` :
    `color:${colorInfo}`
}
function processRarityName(name, colorInfo) {
  return `<span ${getStyle(colorInfo).includes("background") ? "class='gradient' " : ""}style='${getStyle(colorInfo)}'>${name}</span>`
}
const rarityData = [
  ["Unmissable", "100000", "#0ff"],
  ["Guaranteed", "10000", "#2dd"],
  ["Always", "1000", "#4bb"],
  ["Frequent", "100", "#6aa"],
  ["Generic", "10", "#688"],
  ["Basic", "3.5", "#666"],
  ["Common", "1", "#888"],
  ["Regular", "1.1", "#aba"],
  ["Typical", "1.2", "#bdb"],
  ["Ordinary", "1.3", "#cfc"],
  ["Good", "1.4", "#afa"],
  ["Unusual", "1.6", "#8f8"],
  ["Uncommon", "2", "#6f6"],
  ["Infrequent", "2.5", "#3c3"],
  ["Unoften", "3", "#0a0"],
  ["Irregular", "3.5", "#080"],
  ["Nice", "4", "#048"],
  ["Rare", "5", "#08f"],
  ["Advanced", "6", "#26f"],
  ["Cool", "7", "#44f"],
  ["Awesome", "8", "#62f"],
  ["Epic", "10", "#80f"],
  ["Amazing", "12.5", "#f0f"],
  ["Magnificent", "17.5", "#f00"],
  ["Honorable", "25", "#f80"],
  ["Legendary", "40", "#ff0"],
  ["Brilliant", "55", "#d70"],
  ["Astonishing", "75", "#b20"],
  ["Mythical", "100", "#800"],
  ["Extraordinary", "125", "#c0c"],
  ["Phenomenal", "160", "#80f"],
  ["Remarkable", "200", "#42f"],
  ["Prominent", "250", "#28f"],
  ["Divine", "300", "#0ff"],
  ["Outstanding", "400", "#88f"],
  ["Revolutionary", "500", "#c8f"],
  ["Inconcievable", "650", "#f4f"],
  ["Ultra", "800", "#f0f"],
  ["Super", "1000", "#f8f"],
  ["Ultimate", "1250", "#fff"],
  ["Supremum", "1600", "#ccc"],
  ["Ethereal", "2000", "#888"],
  ["Pioneering", "2500", "#040"],
  ["Virtuoso", "3000", "#080"],
  ["Hyper", "4000", "#2d2"],
  ["Unique", "5000", "#4f4"],
  ["???", "7500", [["135", "#fff", "#444"]]],
  ["Astral", "10000", [["45", "#ecf", "#40f"]]],
  ["Unimaginable", "15000", [["r90", "#f00", "#f88 10%", "#f00 20%", "#800 30%", "#f00 40%"]]],
  ["Nano", "20000", [["180", "#ff8", "#884"]]],
  ["Micro", "25000", [["180", "#ff0", "#880"]]],
  ["Milli", "30000", [["180", "#f80", "#840"]]],
  ["One", "37500", [["180", "#f40", "#820"]]],
  ["Kilo", "45000", [["180", "#f00", "#800"]]],
  ["Mega", "60000", [["90", "#400", "#f00", "#400"]]],
  ["Giga", "80000", [["180", "#f04", "#802"]]],
  ["Tera", "100000", [["180", "#f08", "#804"]]],
  ["Peta", "125000", [["180", "#80f", "#408"]]],
  ["Exa", "150000", [["180", "#40f", "#208"]]],
  ["Omega", "200000", [["45", "#00f", "#0ff"]]],
  ["Pseudo", "300000", [["180", "#888", "#444"]]],
  ["nil", "400000", [["180", "#444", "#222"]]],
  ["Supreme", "500000", [["180", "#00f", "#f0f"]]],
  ["Dupreme", "650000", [["180", "#0ff", "#00f"]]],
  ["Hypreme", "800000", [["180", "#0f0", "#0ff"]]],
  ["Universal", "1e6", [["r90", "#40f", "#0f8 12.5%", "#40f 25%", "#f0f 37.5%", "#40f 50%"]]],
  ["Multiversal", "1.5e6", [["180", "#80f", "#80f 45%", "#c8f 55%"]]],
  ["Megaversal", "2.5e6", [["180", "#f0c", "#f0c 45%", "#f8e 55%"]]],
  ["Gigaversal", "4e6", [["180", "#40f", "#40f 45%", "#a8f 55%"]]],
  ["Teraversal", "6e6", [["180", "#04f", "#04f 45%", "#8af 55%"]]],
  ["Omniversal", "1e7", [["90", "#f00", "#ff0", "#0f0", "#0ff", "#00f", "#f0f", "#f00"]]],
  ["Low Impossibility", "1.5e7", [["90", "#080", "#0f0", "#080"]]],
  ["Holy", "2e7", [["45", "#88f", "#ccf", "#88f"]]],
  ["Divinity", "3e7", [["45", "#ff8", "#ffc", "#ff8"]]],
  ["Godly", "5e7", [["135", "#fff", "#0ff", "#fff"]]],
  ["Godlike", "7.5e7", [["90", "#f8f", "#88f", "#8ff"]]],
  ["Eternal", "1e8", [["90", "#8f8", "#8ff", "#88f", "#f8f", "#f88", "#ff8"]]],
  ["Eternalized", "1.4e8", [["135", "#8ff", "#88f", "#f8f", "#f88", "#ff8", "#8f8"]]],
  ["Infinite", "2e8", [["180", "#444", "#fff", "#444"]]],
  ["Quantum", "3e8", [["165", "#fff", "#0f0", "#080", "#fff"]]],
  ["Reality", "4e8", [["r90", "#08f", "#00f 12.5%", "#08f 25%", "#0ff 37.5%", "#08f 50%"]]],
  ["Insane", "5e8", [["90", "#000", "#fff 10%", "#00f 20%", "#08f 50%", "#00f 80%", "#fff 90%", "#000 100%"]]],
  ["Extreme", "6.5e8", [["90", "#fff", "#000 10%", "#08f 20%", "#048 50%", "#08f 80%", "#000 90%", "#fff 100%"]]],
  ["Celestial", "8e8", [
    ["135", "#fff0", "#fff0 20%", "#fffc 20%", "#fffc 30%", "#fff0 30%", "#fff0 70%", "#fffc 70%", "#fffc 80%", "#fff0 80%"],
    ["45", "#0f0", "#084", "#0fc"]
  ]],
  ["Ascendant", "1e9", [
    ["180", "#fff0", "#fff0 10%", "#fffc 25%", "#fff0 50%", "#fffc 75%", "#fff0 90%", "#fff0 100%"],
    ["90", "#444", "#fff 20%", "#aaa 50%", "#fff 80%", "#444 100%"]
  ]],
  ["Chaos", "1.7e9", [["45", "#308", "#60f", "#308"]]],
  ["Unfathomable", "3e9", [
    ["r45", "#60c0", "#60cc 12.5%", "#60c0 25%"],
    ["135", "#800", "#008", "#080"]
  ]],
  ["Mid Impossibility", "5e9", [["90", "#fff", "#ff0", "#fff"]]],
  ["Void", "7.5e9", [
    ["r135", "#8880", "#888 5%", "#8880 10%"],
    ["45", "#444", "#222", "#666", "#222", "#444"]
  ]],
  ["Zlich", "1.5e10", [["180", "#222", "#888", "#222"]]],
  ["Galactic", "3e10", [
    ["r180", "#fff0", "#fff8 25%", "#fff0 50%"],
    ["135", "#208", "#608"]
  ]],
  ["Unreal", "5e10", [["90", "#204", "#80f", "#204"]]],
  ["Surreal", "8e10", [
    ["135", "#0ff0", "#0ff 25%", "#0ff0"],
    ["30", "#0f0", "#00f"]
  ]],
  ["Unbelivable", "1.8e11", [
    ["r90", "#e8f0", "#faf 12.5%", "#e8f0 25%"],
    ["180", "#f0f", "#80f"]
  ]],
  ["Boundless", "4e11", [
    ["r45", "#fff0", "#fff8 10%", "#fff0 20%"],
    ["135", "#8fd", "#8fd0", "#8fd"],
    ["180", "#0f8", "#084", "#0f8"]
  ]],
  ["High Impossibility", "9e11", [
    ["165", "#0000", "#000c", "#0000"],
    ["90", "#f80", "#f00", "#ff0", "#f00", "#f80"]
  ]],
  ["Limitless", "2e12", [["r90", "#fff", "#ff0 25%", "#fff 50%"]]],
  ["Improbable", "5e12", [
    ["180", "#c600", "#fff4"],
    ["r90", "#fff0", "#fff2 10%", "#fff0 20%"],
    ["45", "#840", "#c60", "#840"]
  ]]
];
for (let i = 0; i < rarityData.length; i ++) {
  let div = document.createElement("div");
  div.className = "rarity undiscovered";
  div.id = `rarity-${i}`;
  div.style.background = getStyle(rarityData[i][2], true);
  div.innerHTML = `<span><p class="rarityname">${processRarityName(rarityData[i][0], rarityData[i][2])}</p><p class="raritychance" id="raritychance-${i}">1/1</p><p class="rarityamt" id="rarityamt-${i}">x0</p></span>`;
  document.getElementById("raritycontainer").appendChild(div);
};
let defaults = {
  optionsNotation: "Default",
  maxRollGainEntries: 20,
  inventory: Array(rarityData.length).fill(new Decimal(0)),
  totalRolls: new Decimal(0),
  timeSinceStarted: Date.now(),
  upgData: {
    mupg1: new Decimal(0)
  }
};
let player = defaults;
function overwrite(defaults, current) {
  if (!current) return defaults;
  switch (typeof defaults) {
    case "number":
    case "string":
    case "boolean":
      return current ?? defaults;
    case "object": {
      if (defaults instanceof Decimal) {
        return new Decimal(current ?? defaults)
      } else if (defaults instanceof Array) {
        return defaults.map((a, i) => current ? overwrite(a, current[i]) : a)
      } else { // it's definitely an object what could go wrong
        const object = {};
        for (let i in defaults) {
          object[i] = current ? overwrite(defaults[i], current[i]) : defaults[i]
        };
        return object;
      }
    }
    default:
      return defaults
  }
}
function decodeSave(save = localStorage.getItem("bulkedRollsSave")) {
  if (!save) return; // do nothing to save
  save = JSON.parse(atob(save));
  let prevPlayer = player;
  player = overwrite(prevPlayer, save);
}
decodeSave();
setInterval(() => {
  localStorage.setItem("bulkedRollsSave", btoa(JSON.stringify(player)));
}, 15)
function createOption(name, value, disabled = false) {
  let option = document.createElement("option");
  option.innerHTML = name;
  option.value = value;
  option.disabled = disabled;
  document.getElementById("options-notation").appendChild(option);
}
const allFormatFunctions = [];
for (let i in EternalNotations.HTMLPresets) {
  if (EternalNotations.HTMLPresets[i].name == "Colored Dominoes") continue;
  switch (i) {
    case "Polynomial":
      createOption("Polynomial (x = 10)", "Polynomial");
      allFormatFunctions.push(n => EternalNotations.HTMLPresets.Polynomial(10).format(n));
      createOption("Polynomial (x = 2)", "PolynomialB2");
      allFormatFunctions.push(n => EternalNotations.HTMLPresets.Polynomial(2).format(n));
      createOption("Polynomial (x = 3)", "PolynomialB3");
      allFormatFunctions.push(n => EternalNotations.HTMLPresets.Polynomial(3).format(n));
      break;
    case "RationalFunction":
      createOption("Rational Function (x = 10)", "RationalFunction");
      allFormatFunctions.push(n => EternalNotations.HTMLPresets.RationalFunction(10).format(n));
      createOption("Rational Function (x = 2)", "RationalFunctionB2");
      allFormatFunctions.push(n => EternalNotations.HTMLPresets.RationalFunction(2).format(n));
      createOption("Rational Function (x = 3)", "RationalFunctionB3");
      allFormatFunctions.push(n => EternalNotations.HTMLPresets.RationalFunction(3).format(n));
      break;
    default:
      if (!EternalNotations.HTMLPresets[i]?.length) {
        createOption(EternalNotations.HTMLPresets[i].name, i);
        allFormatFunctions.push(n => EternalNotations.HTMLPresets[i].format(n));
      };
      break;
  }
}
createOption("===== worse notations ahead! =====", "", true);
for (let i in BadNotations) {
  createOption(BadNotations[i].name, `--bn${i}`);
  if (i != "ALL") allFormatFunctions.push(n => BadNotations[i].format(n));
}
document.getElementById("options-notation").value = player.optionsNotation;
document.getElementById("options-notation").addEventListener("change", () => {
  player.optionsNotation = document.getElementById("options-notation").value;
  updateStaticDisp();
})
document.getElementById("options-maxrollgainentries").value = player.maxRollGainEntries;
document.getElementById("options-maxrollgainentries").addEventListener("input", () => {
  player.maxRollGainEntries = parseInt(document.getElementById("options-maxrollgainentries").value);
})