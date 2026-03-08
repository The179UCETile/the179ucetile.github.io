class UpgradeInfo {
  constructor(startCost, increment, type) {
    this.startCost = new Decimal(startCost);
    this.increment = new Decimal(increment);
    this.type = type
  }
};
const windowTitle = document.head.getElementsByTagName("title")[0];
const uselessCurrency = document.getElementById("uselessCurrency");
const mainCurrency = document.getElementById("mainCurrency");
const buttons = {
  beg: "beg",
  begUpg1: "mainUpg1",
  begUpg2: "mainUpg2",
  hardReset: "hardReset"
};
const upgInfo = {
  begUpg: {
    upg1: new UpgradeInfo("10", "1.25", "geometric"),
    upg2: new UpgradeInfo("80", "4", "geometric")
  }
};
for (let i in buttons) {
  buttons[i] = document.getElementById(buttons[i])
}
const d = Decimal;
const e = EternalNotations;
const fs = {
  itemsBegged: new Decimal("0"),
  begUpg1Bought: new Decimal("0"),
  begUpg2Bought: new Decimal("0")
};
let s = fs;
const upgEffect = {
  begUpg: {
    upg1: new Decimal("0"),
    upg2: new Decimal("0")
  }
};
if (localStorage.getItem("saveSoemoenSim")) {
  importSave(localStorage.getItem("saveSoemoenSim"))
};
function importSave(str) {
  const obj = JSON.parse(str);
  for (let i in obj) {
    if (typeof obj[i] == "string") {
      s[i] = new Decimal(obj[i])
    }
  }
}
function buyMax(upg, info, currency) {
  const decimCur = eval(currency);
  const decimUpg = eval(upg);
  if (info.type == "geometric") {
    const upgsGained = d.affordGeometricSeries(decimCur, info.startCost, info.increment, decimUpg);
    decimCur = decimCur.sub(d.sumGeometricSeries(upgsGained, info.startCost, info.increment, decimUpg));
    decimUpg = decimUpg.add(upgsGained)
  } else if (info.type == "arithmetic") {
    const upgsGained = d.affordArithmeticSeries(decimCur, info.startCost, info.increment, decimUpg);
    decimCur = decimCur.sub(d.sumArithmeticSeries(upgsGained, info.startCost, info.increment, decimUpg));
    decimUpg = decimUpg.add(upgsGained)
  } else {
    throw new RangeError("Invalid cost type on buyMax")
  };
  eval(`
    ${currency} = new Decimal(${decimCur.toString()});
    ${upg} = new Decimal(${decimUpg.toString()});
  `)
}
function getCost(upg, info) {
  if (info.type == "geometric") {
    return info.startCost.mul(info.increment.pow(upg))
  } else if (info.type == "arithmetic") {
    return info.startCost.add(info.increment.mul(upg))
  } else {
    throw new RangeError("Invalid cost type on getCost")
  }
}
function aboveReq(upg, info, currency) {
  if (info.type == "geometric" || info.type == "arithmetic") {
    return currency.gte(getCost(upg, info, currency))
  } else {
    throw new RangeError("Invalid cost type on aboveReq")
  }
}
function upgUpd(upg, upgsBought, info, currency) {
  if (info.type == "geometric" || info.type == "arithmetic") {
    upg.disabled = !aboveReq(upgsBought, info, currency)
  } else {
    throw new RangeError("Invalid cost type on upgUpd")
  }
}
function changeElem(id, str) {
  document.getElementById(id).innerHTML = str
}
buttons.hardReset.addEventListener("click", function () {
  if (confirm("Are you sure you want to reset everything?")) {
    localStorage.setItem("saveSoemoenSim", JSON.stringify(fs));
    location.reload()
  }
});
buttons.beg.addEventListener("click", function () {
  s.itemsBegged = s.itemsBegged.add(new Decimal("1").add(upgEffect.begUpg.upg1).mul(upgEffect.begUpg.upg2))
});
buttons.begUpg1.addEventListener("click", function () {
  buyMax("s.begUpg1Bought", upgInfo.begUpg.upg1, "s.itemsBegged");
});
buttons.begUpg2.addEventListener("click", function () {
  buyMax("s.begUpg2Bought", upgInfo.begUpg.upg2, "s.itemsBegged")
})
function updateEffects() {
  upgEffect.begUpg.upg1 = s.begUpg1Bought;
  if (s.begUpg2Bought.gte("50")) {
    upgEffect.begUpg.upg2 = new Decimal("1.4").pow(s.begUpg2Bought.sub("50").pow("0.85").add("50"))
  } else {
    upgEffect.begUpg.upg2 = new Decimal("1.4").pow(s.begUpg2Bought)
  }
}
function save() {
  localStorage.setItem("saveSoemoenSim", JSON.stringify(s))
}
function update() { try {
  updateEffects();
  upgUpd(buttons.begUpg1, s.begUpg1Bought, upgInfo.begUpg.upg1, s.itemsBegged);
  upgUpd(buttons.begUpg2, s.begUpg2Bought, upgInfo.begUpg.upg2, s.itemsBegged);
  changeElem("mainUpg1Stats", `
    Currently: +${e.HTMLPresets.MixedScientific.format(upgEffect.begUpg.upg1)}<br>
    Cost: ${e.HTMLPresets.MixedScientific.format(getCost(s.begUpg1Bought, upgInfo.begUpg.upg1))} items
  `);
  changeElem("mainUpg2Stats", `
    Currently: x${e.HTMLPresets.MixedScientific.format(upgEffect.begUpg.upg2)}<br>
    Cost: ${e.HTMLPresets.MixedScientific.format(getCost(s.begUpg2Bought, upgInfo.begUpg.upg2))} items
  `);
  mainCurrency.innerHTML = `You've begged for ${e.HTMLPresets.MixedScientific.format(s.itemsBegged)} items.`;
  uselessCurrency.innerHTML = `and ${e.HTMLPresets.MixedScientific.format(new Decimal("3").pow(s.itemsBegged).sub("1"))} people are annoyed by your begging`
} catch (error) {
  mainCurrency.innerHTML = error.stack
}}
function updateTitle() {
  windowTitle.innerHTML = `py_alt simulator | ${e.Presets.MixedScientific.format(s.itemsBegged)} items begged`
}
setInterval(update, 16)
setInterval(updateTitle, 100);
setInterval(save, 1000)