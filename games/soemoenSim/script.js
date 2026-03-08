const windowTitle = document.head.getElementsByTagName("title")[0];
const mainCurrency = document.getElementById("mainCurrency");
const buttons = {
  beg: "beg",
  begUpg1: "mainUpg1"
};
const upgInfo = {
  begUpg: {
    upg1: {
      startCost: new Decimal("10"),
      increment: new Decimal("1.25"),
      type: "geometric"
    }
  }
};
for (let i in buttons) {
  buttons[i] = document.getElementById(buttons[i])
}
const d = Decimal;
const e = EternalNotations;
const s = {
  itemsBegged: new Decimal("0"),
  begUpg1Bought: new Decimal("0")
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
  if (info.type == "geometric") {
    const upgsGained = d.affordGeometricSeries(currency, info.startCost, info.increment, upg);
    currency = currency.sub(d.sumGeometricSeries(upgsGained, info.startCost, info.increment, upg));
    upg = upg.add(upgsGained)
  } else if (info.type == "arithmetic") {
    const upgsGained = d.affordArithmeticSeries(currency, info.startCost, info.increment, upg);
    currency = currency.sub(d.sumArithmeticSeries(upgsGained, info.startCost, info.increment, upg));
    upg = upg.add(upgsGained)
  } else {
    throw new RangeError("Invalid cost type on buyMax")
  }
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
buttons.beg.addEventListener("click", function () {
  s.itemsBegged = s.itemsBegged.add("1").add(s.begUpg1Bought)
})
buttons.begUpg1.addEventListener("click", function () {
  buyMax(s.begUpg1Bought, upgInfo.begUpg.upg1, s.itemsBegged)
})
function save() {
  localStorage.setItem("saveSoemoenSim", JSON.stringify(s))
}
function update() { try {
  upgUpd(buttons.begUpg1, s.begUpg1Bought, upgInfo.begUpg.upg1, s.itemsBegged)
  changeElem("mainUpg1Stats", `
    Currently: +${e.HTMLPresets.MixedScientific.format(s.begUpg1Bought)}<br>
    Cost: ${e.HTMLPresets.MixedScientific.format(getCost(s.begUpg1Bought, upgInfo.begUpg.upg1))} items
  `)
  mainCurrency.innerHTML = `You've begged for ${e.HTMLPresets.MixedScientific.format(s.itemsBegged)} items.`
} catch (error) {
  mainCurrency.innerHTML = error.stack
}}
function updateTitle() {
  windowTitle.innerHTML = `py_alt simulator | ${e.Presets.MixedScientific.format(s.itemsBegged)} items begged`
}
setInterval(update, 16)
setInterval(updateTitle, 100);
setInterval(save, 1000)