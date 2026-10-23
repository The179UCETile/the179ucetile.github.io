let { LootTable } = lootalot;
function format(n) {
  if (player.optionsNotation.startsWith("--bn")) {
    switch (player.optionsNotation) {
      case "--bnALL":
        return BadNotations.ALL.format(n, {notationsToUse: allFormatFunctions})
      default:
        return BadNotations[player.optionsNotation.slice(4)].format(n)
    }
  }
  switch (player.optionsNotation) {
    case "Polynomial":
      return EternalNotations.HTMLPresets.Polynomial(10).format(n)
    case "PolynomialB2":
      return EternalNotations.HTMLPresets.Polynomial(2).format(n)
    case "PolynomialB3":
      return EternalNotations.HTMLPresets.Polynomial(3).format(n)
    case "RationalFunction":
      return EternalNotations.HTMLPresets.RationalFunction(10).format(n)
    case "RationalFunctionB2":
      return EternalNotations.HTMLPresets.RationalFunction(2).format(n)
    case "RationalFunctionB3":
      return EternalNotations.HTMLPresets.RationalFunction(3).format(n)
    default:
      return EternalNotations.HTMLPresets[player.optionsNotation].format(n)
  }
};
function createTableWithRarities(items) {
  // items: [[name, chance, color], [name, chance, color], ...]
  const total = items.reduce((a, i) => a.add(Decimal.recip(i[1])), new Decimal(0));
  const table = [];
  for (let i in items) {
    table.push({
      item: {
        name: processRarityName(items[i][0], items[i][2]),
        chance: Decimal.recip(items[i][1]).div(total).recip(),
        index: new Decimal(items[i][3] ?? i)
      },
      w: Decimal.recip(items[i][1])
    })
  };
  return new LootTable(table);
}
const RARITY_TABLE = createTableWithRarities(rarityData);
function roll(bulk) {
  const loot = RARITY_TABLE.loot(bulk);
  let highest = new Decimal(-1), obj = {};
  for (let i of loot) {
    if (i.item.index.gt(highest)) {
      highest = i.item.index;
      obj = i;
    }
  };
  return [obj, loot.sort((a, b) => b.item.index.sub(a.item.index).sign)];
}
let recentGains = [];
function doesExistInRecentGains(idx) {
  return recentGains.reduce((a, i) => { return a || i[0].item.index.eq(idx) }, false)
}
function findIdxInRecentGains(idx) {
  for (let i in recentGains) {
    if (idx.eq(recentGains[i][0].item.index)) return i;
  };
  return -1;
}
function itemCountAdd(item, add) {
  item.count = item.count.add(add);
  return item;
}
function updateRecentGains(gains) {
  for (let i of gains) {
    player.inventory[i.item.index] = player.inventory[i.item.index].add(i.count);
    if (doesExistInRecentGains(i.item.index)) {
      recentGains[findIdxInRecentGains(i.item.index)] = [itemCountAdd(recentGains[findIdxInRecentGains(i.item.index)][0], i.count), Date.now()];
    } else {
      recentGains.push([i, Date.now()]);
    }
  };
  recentGains.sort((a, b) => b[0].item.index.sub(a[0].item.index).sign)
}
function modifiedLerpNoExtrapolate(a, b, t, exp = 0.5) {
  t = Math.min(Math.max(t, 0), 1);
  return a + (b - a) * (t ** exp);
}
function displayGains() {
  let gainText = "";
  for (let i = 0; i < player.maxRollGainEntries; i++) {
    if (recentGains[i]) {
      let time = Date.now() - recentGains[i][1], style = `opacity:${(0.5 - i / player.maxRollGainEntries / 2) * modifiedLerpNoExtrapolate(0, 1, (5e3 - time) / 1e3, 2)};font-size:${modifiedLerpNoExtrapolate(0, 10, (5e3 - time) / 1.5e3, 2)}px`;
      if (time < 400) {
        style = `opacity:${(0.5 - i / player.maxRollGainEntries / 2) * modifiedLerpNoExtrapolate(4, 1, time / 400)};font-size:${modifiedLerpNoExtrapolate(12, 10, time / 400)}px`
      };
      gainText += `<div style="${style}">+${format(recentGains[i][0].count)} ${recentGains[i][0].item.name} <span style="font-size:0.5em;opacity:0.5;font-style:italic">1/${format(recentGains[i][0].item.chance)}</span></div>`
    }
  };
  return gainText;
}
function getBulk() {
  let amt = new Decimal(1);
  amt = amt.add(upgradeData.mupg1.effect());
  return amt;
}
let lastRollInfo = [
  {
    item: {
      name: "None",
      chance: new Decimal(1),
      idx: new Decimal(-1)
    },
    count: new Decimal(1)
  },
  []
];
let lastRollTs = Date.now();
function rollWithUpd() {
  lastRollInfo = roll(getBulk());
  lastRollTs = Date.now();
  updateRecentGains(lastRollInfo[1]);
  player.totalRolls = player.totalRolls.add(getBulk())
}
document.getElementById("roll").addEventListener("click", rollWithUpd);
document.addEventListener("keydown", e => {
  switch (e.key.toLowerCase()) {
    case "arrowdown":
      if (e.shiftKey) {
        switchTabs((currentActiveTab + 1) % TABS.length)
      };
      break;
    case "arrowup":
      if (e.shiftKey) {
        switchTabs(((currentActiveTab - 1) % TABS.length + TABS.length) % TABS.length)
      };
      break;
    case " ":
      e.preventDefault();
      rollWithUpd();
      break;
  }
})
function formatTime(s) {
    if (s < 60) return format(s) + "s"
    else if (s < 3600) return format(Math.floor(s / 60)) + "m " + format(s % 60) + "s"
    else if (s < 86400) return format(Math.floor(s / 3600)) + "h " + format(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else if (s < 31536000) return format(Math.floor(s / 86400) % 365) + "d " + format(Math.floor(s / 3600) % 24) + "h " + format(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
    else return format(Math.floor(s / 31536000)) + "y " + format(Math.floor(s / 86400) % 365) + "d " + format(Math.floor(s / 3600) % 24) + "h " + format(Math.floor(s / 60) % 60) + "m " + format(s % 60) + "s"
}
const functionsThatNeedToBeExecutedAfterNotationChange = [];
const functionsThatNeedToBeExecutedEveryTick = [];
const upgradeData = {};
function updateStaticDisp() {
  for (let i in player.inventory) {
    let j = RARITY_TABLE.pools[0][i].item.index.toNumber();
    document.getElementById(`raritychance-${j}`).innerHTML = `1/${format(RARITY_TABLE.pools[0][i].item.chance)}`;
  };
  for (let i in functionsThatNeedToBeExecutedAfterNotationChange) {
    functionsThatNeedToBeExecutedAfterNotationChange[i]()
  }
}
function changeUpgText(id, n, d, r, c) {
  if (n) {
    document.getElementById(id + "n").innerHTML = n;
  }
  if (d) {
    document.getElementById(id + "d").innerHTML = d;
  }
  if (r) {
    document.getElementById(id + "r").innerHTML = r;
  }
  if (c) {
    document.getElementById(id + "c").innerHTML = c == "" ? "" : `<br>Currently: ${c}`;
  }
}
function addEventUpg(data) {
  document.getElementById(data.id).addEventListener("click", () => {
    if (data.canBuy(player.upgData[data.id])) {
      data.callback(player.upgData[data.id]);
      data.updater(player.upgData[data.id], data.effect)
    }
  });
  functionsThatNeedToBeExecutedEveryTick.push(() => {
    if (data.canBuy(player.upgData[data.id])) {
      document.getElementById(data.id).classList.add("buyable")
    } else {
      document.getElementById(data.id).classList.remove("buyable")
    }
  });
  functionsThatNeedToBeExecutedAfterNotationChange.push(() => { data.updater(player.upgData[data.id], data.effect) });
  upgradeData[data.id] = data;
  data.updater(player.upgData[data.id], data.effect);
}
addEventUpg({
  id: "mupg1",
  canBuy: amt => {
    if (amt.gt(rarityData.length - 23)) return player.inventory[rarityData.length - 1].gte(Decimal.pow(2, amt.sub(rarityData.length - 23)));
    let canBuy = false;
    for (let i = amt.add(22).toNumber(); i < rarityData.length; i++) {
      canBuy ||= player.inventory[i].gte(1)
    };
    return canBuy;
  },
  updater: (amt, eff) => {
    if (amt.gt(rarityData.length - 23)) {
      changeUpgText("mupg1", null, null, `Requirement: ${format(Decimal.pow(2, amt.sub(rarityData.length - 23)))} ${processRarityName(rarityData[rarityData.length - 1][0], rarityData[rarityData.length - 1][2])}`, `+${format(eff())}`);
    } else {
      changeUpgText("mupg1", null, null, `Requirement: ${format(1)} ${processRarityName(rarityData[amt.add(22).toNumber()][0], rarityData[amt.add(22).toNumber()][2])}`, `+${format(eff())}`);
    }
  },
  callback: amt => {
    player.upgData.mupg1 = amt.add(1);
  },
  effect: (amt = player.upgData.mupg1) => {
    return Decimal.pow(1.2, amt).sub(1).add(amt).floor()
  }
})
function update() {
  for (let i of TABS) {
    if (i.length == 1) continue;
    if (i[1]()) {
      document.getElementById(`tabbtn-${toTabTitle(i[0])}`).classList.remove("hidden")
    } else {
      document.getElementById(`tabbtn-${toTabTitle(i[0])}`).classList.add("hidden")
    }
  }
  if (isInTab("Inventory")) {
    for (let i in player.inventory) {
      document.getElementById(`rarityamt-${i}`).innerHTML = `x${format(player.inventory[i])}`;
      document.getElementById(`rarity-${i}`).style.filter = "";
      if (player.inventory[i].gt(0)) {
        document.getElementById(`rarity-${i}`).classList.remove("undiscovered")
      } else {
        document.getElementById(`rarity-${i}`).classList.add("undiscovered")
      }
    }
    for (let i in recentGains) {
      let time = Date.now() - recentGains[i][1];
      document.getElementById(`rarity-${recentGains[i][0].item.index}`).style.filter = `brightness(${modifiedLerpNoExtrapolate(300, 100, time / 500)}%)`;
    }
  };
  document.getElementById("rarity").innerHTML = `${lastRollInfo[0].item.name}${lastRollInfo[0].count.gt("1") ? ` (x${format(lastRollInfo[0].count)})` : ""}`;
  document.getElementById("rarity").style.filter = `brightness(${modifiedLerpNoExtrapolate(400, 100, (Date.now() - lastRollTs) / 400)}%)`
  document.getElementById("rarityChance").innerHTML = `1/${format(lastRollInfo[0].item.chance)}`;
  document.getElementById("roll").innerHTML = getBulk().eq("1") ? "Roll" : `Roll (x${format(getBulk())})`;
  document.getElementById("gains").innerHTML = displayGains();
  for (let i in recentGains) {
    if (Date.now() - recentGains[i][1] > 5e3) {
      delete recentGains[i];
    };
  };
  recentGains = recentGains.filter(a => typeof a != "undefined");

  document.getElementById("statistics-totalrolls").innerHTML = `Total rolls: ${format(player.totalRolls)}`;
  document.getElementById("statistics-timeplayed").innerHTML = `Time played: ${formatTime((Date.now() - player.timeSinceStarted) / 1e3)}`;

  for (let i in functionsThatNeedToBeExecutedEveryTick) {
    functionsThatNeedToBeExecutedEveryTick[i]()
  }
}
setInterval(update, 15)
updateStaticDisp();