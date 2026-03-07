const windowTitle = document.head.getElementsByTagName("title")[0];
const mainCurrency = document.getElementById("mainCurrency");
const buttons = {
  beg: "beg",
  begUpg: {
    upg1: "mainUpg1",
  }
};
const upgInfo = {
  begUpg: {
    upg1: {
      startCost: new Decimal("10"),
      increment: new Decimal("1.15"),
      type: "geometric"
    }
  }
};
function process(obj) {
  for (let i in obj) {
    if (typeof obj[i] == "object") obj(obj[i])
    obj[i] = document.getElementById(obj[i])
  }
}
process(buttons);
const d = Decimal;
const e = EternalNotations;
const s = {
  itemsBegged: new Decimal("0"),
  begUpg1Bought: new Decimal("0")
};
if (localStorage.getItem("saveSoemoenSim")) {
  try {
    importSave(localStorage.getItem("saveSoemoenSim"))
  } catch (error) {
    mainCurrency.innerHTML = error.stack
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
    upg.disabled = aboveReq(upgsBought, info, currency)
  } else {
    throw new RangeError("Invalid cost type on upgUpd")
  }
}
function changeElem(id, str) {
  document.getElementById(id).innerHTML = str
}
buttons.beg.addEventListener("onclick", function () {
  s.itemsBegged = s.itemsBegged.add("1")
})
buttons.begUpg.upg1.addEventListener("onclick", function () {
  buyMax(s.begUpg1Bought, upgInfo.begUpg.upg1, s.itemsBegged)
})
function save() {
  localStorage.setItem("saveSoemoenSim", JSON.stringify(s))
}
function update() {
  upgUpd(buttons.begUpg.upg1, s.begUpg1Bought, upgInfo.begUpg.upg1, s.itemsBegged)
  changeElem("mainUpg1Stats", `
    Currently: +${e.HTMLPresets.MixedScientific.format(s.begUpg1Bought)}<br>
    Cost: ${e.HTMLPresets.MixedScientific.format(getCost(s.begUpg1Bought, upgInfo.begUpg.upg1))}
  `)
  mainCurrency.innerHTML = `You've begged for ${e.HTMLPresets.MixedScientific.format(s.itemsBegged)} items.`
}
function updateTitle() {
  windowTitle.innerHTML = `py_alt simulator | ${e.Presets.MixedScientific.format(s.itemsBegged)} items begged`
}
setInterval(update, 16)
setInterval(updateTitle, 100);
setInterval(save, 1000)