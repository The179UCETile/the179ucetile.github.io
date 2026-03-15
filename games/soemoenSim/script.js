class UpgradeInfo {
  constructor(startCost, increment, type, maxUpg = "Infinity") {
    this.startCost = new Decimal(startCost);
    this.increment = new Decimal(increment);
    this.type = type;
    this.maxUpg = new Decimal(maxUpg)
  }
};
const windowTitle = document.head.getElementsByTagName("title")[0];
const uselessCurrency = document.getElementById("uselessCurrency");
const mainCurrency = document.getElementById("mainCurrency");
const buttons = {
  beg: "beg",
  begUpg1: "mainUpg1",
  begUpg2: "mainUpg2",
  begUpg3: "mainUpg3",
  begUpg4: "mainUpg4",
  hardReset: "hardReset"
};
const upgInfo = {
  begUpg: {
    upg1: new UpgradeInfo("10", "1.25", "geometric"),
    upg2: new UpgradeInfo("80", "2", "geometric"),
    upg3: new UpgradeInfo("400", "1.5", "geometric", "20"),
    upg4: new UpgradeInfo("5e3", "1", "geometric", "1")
  }
};
for (let i in buttons) {
  buttons[i] = document.getElementById(buttons[i])
}
const d = Decimal;
const EN = EternalNotations;
const fs = {
  itemsBegged: new Decimal("0"),
  begUpg1Bought: new Decimal("0"),
  begUpg2Bought: new Decimal("0"),
  begUpg3Bought: new Decimal("0"),
  begUpg4Bought: new Decimal("0")
};
let s = fs;
const upgEffect = {
  begUpg: {
    upg1: new Decimal("0"),
    upg2: new Decimal("1"),
    upg3: new Decimal("0"),
    upg4: new Decimal("1")
  }
};
let itemsBeggedPerClick = new Decimal("1");
let itemsBeggedPerSecond = new Decimal("0");
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
  let decimCur = eval(currency);
  let decimUpg = eval(upg);
  if (decimUpg.gte(info.maxUpg)) return;
  if (info.type == "geometric") {
    const upgsGained = d.min(d.affordGeometricSeries(decimCur, info.startCost, info.increment, decimUpg), info.maxUpg.sub(decimUpg));
    decimCur = decimCur.sub(d.sumGeometricSeries(upgsGained, info.startCost, info.increment, decimUpg));
    decimUpg = decimUpg.add(upgsGained)
  } else if (info.type == "arithmetic") {
    const upgsGained = d.min(d.affordArithmeticSeries(decimCur, info.startCost, info.increment, decimUpg), info.maxUpg.sub(decimUpg));
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
  if (upg.gte(info.maxUpg)) {
    return new Decimal("Infinity")
  } else if (info.type == "geometric") {
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
function usePlural(str, decim) {
  if (decim.eq("1")) return str
  else {
    if (/s$/.test(str)) return `${str}es`
    else return `${str}s`
  }
}
buttons.hardReset.addEventListener("click", function () {
  if (confirm("Are you sure you want to reset everything?")) { try {
    s = fs;
    localStorage.setItem("saveSoemoenSim", JSON.stringify(fs));
    location.reload()
  } catch (e) {
    alert(e.stack)
  }}
});
buttons.beg.addEventListener("click", function () {
  s.itemsBegged = s.itemsBegged.add(itemsBeggedPerClick)
});
// TODO: generalize this
buttons.begUpg1.addEventListener("click", function () {
  buyMax("s.begUpg1Bought", upgInfo.begUpg.upg1, "s.itemsBegged");
});
buttons.begUpg2.addEventListener("click", function () {
  buyMax("s.begUpg2Bought", upgInfo.begUpg.upg2, "s.itemsBegged")
});
buttons.begUpg3.addEventListener("click", function () {
  buyMax("s.begUpg3Bought", upgInfo.begUpg.upg3, "s.itemsBegged")
});
buttons.begUpg4.addEventListener("click", function () {
  buyMax("s.begUpg4Bought", upgInfo.begUpg.upg4, "s.itemsBegged")
});
function updateEffects() {
  upgEffect.begUpg.upg1 = s.begUpg1Bought;
  if (s.begUpg2Bought.gte("50")) {
    upgEffect.begUpg.upg2 = new Decimal("1.4").pow(s.begUpg2Bought.sub("50").pow("0.85").add("50"))
  } else {
    upgEffect.begUpg.upg2 = new Decimal("1.4").pow(s.begUpg2Bought)
  };
  upgEffect.begUpg.upg3 = s.begUpg3Bought.div("100");
  upgEffect.begUpg.upg4 = s.begUpg4Bought.gte("1") ? s.itemsBegged.add("1").log10().pow("0.7").add("1") : new Decimal("1")
}
function save() {
  localStorage.setItem("saveSoemoenSim", JSON.stringify(s))
}
let lastUpd = Date.now();
let delta = 0.016;
function update() { try {
  delta = (Date.now() - lastUpd) / 1e3;
  updateEffects();
  itemsBeggedPerClick = new Decimal("1").add(upgEffect.begUpg.upg1).mul(upgEffect.begUpg.upg2).mul(upgEffect.begUpg.upg4);
  itemsBeggedPerSecond = itemsBeggedPerClick.mul(upgEffect.begUpg.upg3);
  s.itemsBegged = s.itemsBegged.add(itemsBeggedPerSecond.mul(delta));
  upgUpd(buttons.begUpg1, s.begUpg1Bought, upgInfo.begUpg.upg1, s.itemsBegged);
  upgUpd(buttons.begUpg2, s.begUpg2Bought, upgInfo.begUpg.upg2, s.itemsBegged);
  upgUpd(buttons.begUpg3, s.begUpg3Bought, upgInfo.begUpg.upg3, s.itemsBegged);
  upgUpd(buttons.begUpg4, s.begUpg4Bought, upgInfo.begUpg.upg4, s.itemsBegged);
  changeElem("mainUpg1Stats", `
    Currently: +${EN.HTMLPresets.MixedScientific.format(upgEffect.begUpg.upg1)}<br>
    Cost: ${EN.HTMLPresets.MixedScientific.format(getCost(s.begUpg1Bought, upgInfo.begUpg.upg1))} items
  `);
  changeElem("mainUpg2Stats", `
    Currently: x${EN.HTMLPresets.MixedScientific.format(upgEffect.begUpg.upg2)}<br>
    Cost: ${EN.HTMLPresets.MixedScientific.format(getCost(s.begUpg2Bought, upgInfo.begUpg.upg2))} items
  `);
  changeElem("mainUpg3Stats", `
    Currently: +${EN.HTMLPresets.Default.format(upgEffect.begUpg.upg3.mul(100))}%/sec<br>
    Cost: ${EN.HTMLPresets.MixedScientific.format(getCost(s.begUpg3Bought, upgInfo.begUpg.upg3))} items
  `);
  changeElem("mainUpg4Stats", `
    Currently: x${EN.HTMLPresets.Default.format(upgEffect.begUpg.upg4)}<br>
    Cost: ${EN.HTMLPresets.MixedScientific.format(getCost(s.begUpg4Bought, upgInfo.begUpg.upg4))} items
  `);
  changeElem("begStats", `+${EN.HTMLPresets.MixedScientific.format(itemsBeggedPerClick)}/click | +${EN.HTMLPresets.MixedScientific.format(itemsBeggedPerSecond)}/sec`);
  mainCurrency.innerHTML = `You've begged for ${EN.HTMLPresets.MixedScientific.format(s.itemsBegged)} items.`;
  uselessCurrency.innerHTML = `and ${EN.HTMLPresets.MixedScientific.format(new Decimal("3").pow(s.itemsBegged).sub("1"))} people are annoyed by your begging`;
  lastUpd = Date.now();
} catch (error) {
  mainCurrency.innerHTML = error.stack
}}
function updateTitle() {
  windowTitle.innerHTML = `py_alt simulator | ${EN.Presets.MixedScientific.format(s.itemsBegged)} items begged`
}
setInterval(update, 16)
setInterval(updateTitle, 100);
setInterval(save, 1000);