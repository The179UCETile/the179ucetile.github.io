const diff = {
  weights: [0, 0.2, 0.4, 0.55, 0.70, 0.80, 0.90],
  colors: [
    "#00ce00", "#76f447", "#ffff00", "#fe7c00",
    "#ff3232", "#a00000", "#19222d", "#c900c8",
    "#0000ff", "#028aff", "#00ffff", "#ffffff",
    "#9691ff", "#4b00c8", "#65666d"
  ],
  names: [
    "Effortless", "Easy", "Medium", "Hard",
    "Difficult", "Challenging", "Intense", "Remorseless",
    "<b>INSANE</b>", "<b>EXTREME</b>", "<b>TERRIFYING</b>", "<b><i>CATASTROPHIC</i></b>",
    "<b><i>HORRIFIC</i></b>", "<b><i><u>UNREAL</u></i></b>", "<b><i><u>nil</u></i></b>"
  ],
  ranges: {
    0:"Baseline",
    0.01:"Bottom",
    0.12:"Bottom-Low",
    0.23:"Low",
    0.34:"Low-Mid",
    0.45:"Mid",
    0.56:"Mid-High",
    0.67:"High",
    0.78:"High-Peak",
    0.89:"Peak"
  }
};
var modif = [];
function noUndef(value) {
  return !(value===undefined);
}
const utils = {
  processModif: function(type) {
    switch (type) {
      case "mult": {
        let out = 1;
        for (let i = 0; i < modif.length&&modif[i][0]; i++) {
          out *= modif[i][1];
        };
        return out;
        } break;
      case "min": {
        let min = -Infinity;
        for (let i = 0; i < modif.length; i++) {
          min = Math.max(min, modif[i][1])
        };
        return min;
        } break;
    }
  },
  properNum: function(base, integ = false) {
    let out = base*this.processModif("mult", modif);
    if (integ) {
      out = Math.floor(out);
    };
    return this.commaFormat(out)
  },
  updateModif: function() {
    for (let i = 0; i < modif.length; i++) {
      modif[i][2]--;
      if (modif[i][2] == 0) {
        delete modif[i];
        modif = modif.filter(noUndef);
      }
    }
  },
  commaFormat: function(num) {
    let portions = num.toString().split(".");
    portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    if (portions.length == 1)
      return portions[0];
    return portions[0] + "." + portions[1];
  },
  properDiff: function(num, modif) {
    return Number((num+Math.log10(this.processModif("mult", modif))/Math.log10(3)).toFixed(2));
  }
}
function generatePunishment() { try {
  utils.updateModif();
  const rand = Math.random();
  let diffRange = -1;
  const punishmentsSorted = [];
  for (let i = 0; i < diff.weights.length&&rand >= diff.weights[i]; i++) {
    diffRange++;
  }
  diffRange = Math.max(diffRange, utils.processModif("min"));
  const Punishments = [
    // punishmentName, diff, defaultDiff, modif (optional)
    ["Nothing happens.", 0, 0],
    [`Wait for ${utils.properNum(10)} seconds.`, utils.properDiff(0.4), 0.4],
    [`Scroll ${utils.properNum(1e3)} characters in TextWall.<br>Page zooming is forbidden.`, utils.properDiff(1.2), 1.2],
    [`Survive the fictional googology punishment.`, 1.6, 1.6],
    [`Scroll ${utils.properNum(5e3)} characters in TextWall.<br>Page zooming is forbidden.`, utils.properDiff(3), 3],
    [`Walk ${utils.properNum(100)} meters IRL.`, utils.properDiff(1.4), 1.4],
    ["Actually touch grass.<br>The hard part is finding grass.", 2.6, 2.6],
    [`Drink ${utils.properNum(25)}ml of water.`, utils.properDiff(1.5), 1.5],
    [`Scroll ${utils.properNum(25e3)} characters in TextWall.<br>Page zooming is forbidden.`, utils.properDiff(4.8), 4.8],
    [`In any game that you have experience on, complete ${utils.properNum(2)} levels that you consider the closest to &quot;Medium&quot; in Eternal Towers of Hell difficulty.`, utils.properDiff(2.44), 2.44],
    ["Regenerate, and double the next punishment.", 4.15, 4.15, ["mult", 2, 2]],
    ["Regenerate, and triple the next punishment.", 4.86, 4.86, ["mult", 3, 2]],
    [`For the next ${utils.properNum(15)} minutes, type your messages .drawkcab`, utils.properDiff(5.32), 5.32],
    [`For the next ${utils.properNum(10)} minutes, speak with only emojis.`, utils.properDiff(5.48), 5.48],
    [`In any game that you have experience on, complete ${utils.properNum(3)} levels that you consider the closest to &quot;Hard&quot; in Eternal Towers of Hell difficulty.`, utils.properDiff(3.63), 3.63],
    [`Regenerate, and all punishments will be doubled for the next 5 punishments.`, 5.37, 5.37, ["mult", 2, 6]],
    [`Regenerate, and you cannot roll punishments that are easier than Easy for the next 5 punishments.`, 4.16, 4.16, ["min", 2, 6]],
    [`Regenerate, and you cannot roll punishments that are easier than Hard for the next 5 punishments.`, 6.32, 6.32, ["min", 4, 6]]
  ];
  for (let i = 0; i < Punishments.length; i++) {
    if (punishmentsSorted[Math.floor(Punishments[i][2])]) {
      punishmentsSorted[Math.floor(Punishments[i][2])].push(Punishments[i]);
    } else {
      punishmentsSorted[Math.floor(Punishments[i][2])] = [Punishments[i]];
    };
  };
  let punishmentInfo = punishmentsSorted[diffRange][Math.floor(Math.random()*(punishmentsSorted[diffRange]??["a"]).length)];
  if (punishmentInfo[3]) {
    modif.push(punishmentInfo[3]);
  };
  let rangeName = "";
  for (let i = 0; punishmentInfo[1]%1 >= Object.keys(diff.ranges)[i]; i++) {
    rangeName = Object.values(diff.ranges)[i];
  }
  document.getElementById("punishment").innerHTML = `${punishmentInfo[0]}<br>Difficulty: ${punishmentInfo[1].toString()} (${rangeName} ${diff.names[Math.floor(punishmentInfo[1])]})`;
  document.getElementById("punishment").style.color = diff.colors[Math.floor(punishmentInfo[1])];
  } catch (e) {
    document.getElementById("punishment").innerHTML = `${e.name} occured (${e.message}, ${e.stack})`;
  }
};