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
var modifiers = [];
function noUndef(value) {
  return !(value===undefined);
}
const utils = {
  processModif: function(type) {
    switch (type) {
      case "mult": {
        let out = 1;
        for (let i = 0; i < modifiers.length&&modifiers[i][0]; i++) {
          out *= modifiers[i][1];
        }
        return out;
        } break;
    }
  },
  properNum: function(base, integ = false) {
    let out = base*this.processModif("mult");
    if (integ) {
      out = Math.floor(out);
    };
    return this.commaFormat(out)
  },
  updateModif: function() {
    for (let i = 0; i < modifiers.length; i++) {
      modifiers[i][2]--;
      if (modifiers[i][2] == 0) {
        delete modifiers[i];
        modifiers = modifiers.filter(noUndef);
      }
    }
  },
  commaFormat: function(num) {
    let portions = num.toString().split(".")
    portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    if (portions.length == 1)
      return portions[0]
    return portions[0] + "." + portions[1]
  },
  properDiff: function(num) {
    return Number((num+Math.log10(this.processModif("mult"))/Math.log10(3)).toFixed(2));
  }
}
function generatePunishment() {
  utils.updateModif();
  let punishment = document.getElementById("punishment");
  let punishmentDiff = document.getElementById("punishmentDiff");
  const rand = Math.random();
  let diffRange = -1;
  const punishmentsSorted = [];
  for (let i = 0; i < diff.weights.length&&rand >= diff.weights[i]; i++) {
    diffRange++;
  }
  const Punishments = [
    // punishmentName, diff, defaultDiff, modif (optional)
    ["Nothing happens.", 0, 0],
    [`Scroll ${utils.properNum(1e3)} characters in TextWall.<br>Page zooming is forbidden.`, utils.properDiff(1.2), 1.2],
    [`Survive the fictional googology punishment.`, 1.6, 1.6],
    [`Scroll ${utils.properNum(5e3)} characters in TextWall.<br>Page zooming is forbidden.`, utils.properDiff(3), 3],
    [`Walk ${utils.properNum(100)} meters IRL.`, utils.properDiff(1.4), 1.4],
    ["Actually touch grass.<br>The hard part is finding grass.", 2.6, 2.6],
    [`Drink ${utils.properNum(25)}ml of water.`, utils.properDiff(1.5), 1.5],
    [`Scroll ${utils.properNum(25e3)} characters in TextWall.<br>Page zooming is forbidden.`, utils.properDiff(4.8), 4.8],
    [`In any game that you have experience on, complete ${utils.properNum(2)} levels that you consider the closest to &quot;Medium&quot; in Eternal Towers of Hell difficulty.`, utils.properDiff(2.44), 2.44],
    ["Regenerate, and next punishment will be doubled.", 4.15, ["mult", 2, 1]],
    ["Regenerate, and next punishment will be tripled.", 4.86, ["mult", 3, 1]]
  ];
  for (let i = 0; i < Punishments.length; i++) {
    punishmentsSorted[Math.floor(Punishments[i][2])].push(Punishments[i]);
  };
  let punishmentInfo = punishmentsSorted[diffRange][Math.floor(Math.random()*punishmentsSorted[diffRange].length)];
  if (punishmentInfo[3]) {
    modifiers.push(punishmentInfo[3]);
  };
  let rangeName = "";
  for (let i = 0; punishmentInfo[1]%1 >= Object.keys(diff.ranges)[i]; i++) {
    rangeName = Object.values(diff.ranges)[i];
  }
  punishment.innerHTML = punishmentInfo[0];
  punishmentDiff.innerHTML = `Difficulty: ${punishmentInfo[1].toString()} (${rangeName} ${diff.names[Math.floor(punishmentInfo[1])]})`;
  punishment.style.color = diff.colors[Math.floor(punishmentInfo[1])];
  punishmentDiff.style.color = diff.colors[Math.floor(punishmentInfo[1])];
}