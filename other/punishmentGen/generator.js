const diff = {
  weights: [0, 0.25, 0.45, 0.65, 0.80, 0.90],
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
  processModif: function(type, arr) {
    switch (type) {
      case "mult": {
        let out = 1;
        for (let i = 0; i < arr.length&&arr[i][0]; i++) {
          out *= arr[i][1];
        }
        return out;
        } break;
    }
  },
  properNum: function(base, arr, integ = false) {
    let out = base*this.processModif("mult", arr);
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
  properDiff: function(num, arr) {
    return Number((num+Math.log10(this.processModif("mult", arr))/Math.log10(3)).toFixed(2));
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
  const Punishments = [
    // punishmentName, diff, defaultDiff, modif (optional)
    ["Nothing happens.", 0, 0],
    [`Scroll ${utils.properNum(1e3,modif)} characters in TextWall.<br>Page zooming is forbidden.`, utils.properDiff(1.2,modif), 1.2],
    [`Survive the fictional googology punishment.`, 1.6, 1.6],
    [`Scroll ${utils.properNum(5e3,modif)} characters in TextWall.<br>Page zooming is forbidden.`, utils.properDiff(3,modif), 3],
    [`Walk ${utils.properNum(100,modif)} meters IRL.`, utils.properDiff(1.4,modif), 1.4],
    ["Actually touch grass.<br>The hard part is finding grass.", 2.6, 2.6],
    [`Drink ${utils.properNum(25,modif)}ml of water.`, utils.properDiff(1.5,modif), 1.5],
    [`Scroll ${utils.properNum(25e3,modif)} characters in TextWall.<br>Page zooming is forbidden.`, utils.properDiff(4.8,modif), 4.8],
    [`In any game that you have experience on, complete ${utils.properNum(2,modif)} levels that you consider the closest to &quot;Medium&quot; in Eternal Towers of Hell difficulty.`, utils.properDiff(2.44,modif), 2.44],
    ["Regenerate, and double the next punishment.", 4.15, 4.15, ["mult", 2, 2]],
    ["Regenerate, and triple the next punishment.", 4.86, 4.86, ["mult", 3, 2]],
    [`For the next ${utils.properNum(15,modif)} minutes, type your messages .drawkcab`, utils.properDiff(5.32,modif), 5.32]
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
    modifiers.push(punishmentInfo[3]);
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