const diff = {
  weights: [0, 0.1, 0.35, 0.55, 0.70, 0.80, 0.90, 0.95],
  colors: [
    "#00ce00", "#76f447", "#ffff00", "#fe7c00",
    "#ff3232", "#a00000", "#19222d", "#c900c8",
    "#0000ff", "#028aff", "#00ffff", "#ffffff",
    "#9691ff", "#4b00c8", "#65666d"
  ],
  names: [
    "Effortless", "Easy", "Medium", "Hard",
    "Difficult", "Challenging", "Intense", "Remorseless",
    "Insane", "Extreme", "Terrifying", "Catastrophic",
    "Horiffic", "Unreal", "nil"
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
  processModif: function(type, diff) {
    switch (type) {
      case "mult": {
        let out = 1;
        for (let i = 0; i < modif.length; i++) {
          if (modif[i][0] == "mult") {
            out *= modif[i][1]=="diff"?diff:modif[i][1];
          };
        };
        return out;
      } break;
      case "min": {
        let min = -Infinity;
        for (let i = 0; i < modif.length; i++) {
          if (modif[i][0] == "min") {
            min = Math.max(min, modif[i][1])
          };
        };
        return min;
      } break;
    }
  },
  properNum: function(base, diff, integ = false) {
    let out = base*this.processModif("mult", diff);
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
  properDiff: function(num) {
    return Number(Math.min(num+Math.log10(this.processModif("mult", num))/Math.log10(3), 14.99).toFixed(2));
  },
  playAudio: function(id) {
    let audio = document.getElementById(id);
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  },
  formatModif: function() {
    let str = "";
    for (let i = 0; i < modif.length; i++) {
      str += "<span class=\"modif\">";
      switch (modif[i][0]) {
        case "mult":
          str += "x"+modif[i][1]=="diff"?"[difficulty]":this.commaFormat(modif[i][1]);
          break;
        case "min":
          str += `min ${modif[i][1]}`;
          break;
      };
      str += ` (${modif[i][2]})</span>`;
    };
    return str;
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
    [`Nothing happens.`, 0, 0],
    [`Wait for ${utils.properNum(10, 0.4)} seconds.`, utils.properDiff(0.4), 0.4],
    [`Scroll ${utils.properNum(1e3, 1.2, true)} characters in TextWall.<br>Page zooming is forbidden.`, utils.properDiff(1.2), 1.2],
    [`Survive the fictional googology punishment.`, 1.6, 1.6],
    [`Scroll ${utils.properNum(5e3, 3, true)} characters in TextWall.<br>Page zooming is forbidden.`, utils.properDiff(3), 3],
    [`Walk ${utils.properNum(100, 1.4)} meters IRL.`, utils.properDiff(1.4), 1.4],
    [`Actually touch grass.<br>(the hard part is finding it)`, 2.6, 2.6],
    [`Drink ${utils.properNum(25, 1.5)}ml of water.`, utils.properDiff(1.5), 1.5],
    [`Scroll ${utils.properNum(25e3, 4.8, true)} characters in TextWall.<br>Page zooming is forbidden.`, utils.properDiff(4.8), 4.8],
    [`In any game that you have experience on, complete ${utils.properNum(2, 2.44, true)} levels that you consider the closest to &quot;Medium&quot; in Eternal Towers of Hell difficulty.`, utils.properDiff(2.44), 2.44],
    [`Regenerate, and double the next punishment.`, 4.15, 4.15, ["mult", 2, 2]],
    [`Regenerate, and triple the next punishment.`, 4.86, 4.86, ["mult", 3, 2]],
    [`For the next ${utils.properNum(15, 5.32)} minutes, type your messages .drawkcab`, utils.properDiff(5.32), 5.32],
    [`For the next ${utils.properNum(10, 5.48)} minutes, speak with only emojis.`, utils.properDiff(5.48), 5.48],
    [`In any game that you have experience on, complete ${utils.properNum(3, 3.63, true)} levels that you consider the closest to &quot;Hard&quot; in Eternal Towers of Hell difficulty.`, utils.properDiff(3.63), 3.63],
    [`Regenerate, and all punishments will be doubled for the next 5 punishments.`, 5.37, 5.37, ["mult", 2, 6]],
    [`Regenerate, and you cannot generate punishments that are easier than Easy for the next 5 punishments.`, 4.16, 4.16, ["min", 2, 6]],
    [`Regenerate, and you cannot generate punishments that are easier than Hard for the next 5 punishments.`, 6.32, 6.32, ["min", 4, 6]],
    [`For the next ${utils.properNum(15, 6.8)} minutes, speak in Morse code.`, utils.properDiff(6.8), 6.8],
    [`Jump ${utils.properNum(10, 1.25, true)} times IRL.`, utils.properDiff(1.25), 1.25],
    [`Wait for ${utils.properNum(3, 2.48)} minutes.`, utils.properDiff(2.48), 2.48],
    [`Regenerate, and multiply the next punishment by 10.`, 7.2, 7.2, ["mult", 10, 2]],
    [`Regenerate, and all punishments will be doubled for the next 10 punishments.`, 7.1, 7.1, ["mult", 2, 11]],
    [`Complete ${utils.properNum(2, 7.35, true)} Intense towers in Eternal Towers of Hell in ${utils.properNum(20, 7.35, true)} minutes.`, utils.properDiff(7.35), 7.35],
    [`Count to ${utils.properNum(50, 1.93, true)} IRL.<br>Skipping numbers is not allowed.`, utils.properDiff(1.93), 1.93],
    [`Count to ${utils.properNum(1e3, 4.26, true)} IRL.<br>Skipping numbers is not allowed.`, utils.properDiff(4.26), 4.26],
    [`Count to ${utils.properNum(1e5, 6.28, true)} IRL.<br>Skipping numbers is not allowed.`, utils.properDiff(6.28), 6.28],
    [`Send someone ${utils.properNum(10, 2.2)} seconds of keyboard spam.`, utils.properDiff(2.2), 2.2],
    [`Count to ${utils.properNum(1e6, 7.99, true)} IRL.<br>Skipping numbers is not allowed.`, utils.properDiff(7.99), 7.99],
    [`For the next ${utils.properNum(20, 3.28)} minutes, speak in the form of &quot;No ___ Delete ___ Yes ___ Add ___&quot;`, utils.properDiff(3.28), 3.28],
    [`Speak in another language that you DON&apos;T how to speak for ${utils.properNum(10, 5.94)} minutes.`, utils.properDiff(5.94), 5.94],
    [`Speak in Base64 encoding for ${utils.properNum(5, 6.1)} minutes.`, utils.properDiff(6.1), 6.1],
    [`Speak in +1 or -1 Caesar cypher for ${utils.properNum(8, 4.66)} minutes.`, utils.properDiff(4.66), 4.66],
    [`Regenerate, and multiply the next punishment by 0.75.`, 0.2, 0.2, ["mult", 0.75, 2]],
    [`Regenerate, and multiply the next punishment by it's difficulty.`, 4.3, 4.3, ["mult", "diff", 2]]
  ];
  for (let i = 0; i < Punishments.length; i++) {
    if (punishmentsSorted[Math.floor(Punishments[i][2])]) {
      punishmentsSorted[Math.floor(Punishments[i][2])].push(Punishments[i]);
    } else {
      punishmentsSorted[Math.floor(Punishments[i][2])] = [Punishments[i]];
    };
  };
  let punishmentInfo = punishmentsSorted[diffRange][Math.floor(Math.random()*(punishmentsSorted[diffRange]??["a"]).length)];
  if (punishmentInfo[1] >= 8) {
    utils.playAudio("emojideath");
  } else if (punishmentInfo[1] >= 4) {
    utils.playAudio("vineBoom");
  } else {};
  if (punishmentInfo[3]) {
    modif.push(punishmentInfo[3]);
  };
  let rangeName = "";
  for (let i = 0; punishmentInfo[1]%1 >= Object.keys(diff.ranges)[i]; i++) {
    rangeName = Object.values(diff.ranges)[i];
  }
  document.getElementById("punishment").innerHTML = `${punishmentInfo[0]}<br>Difficulty: ${punishmentInfo[1].toString()} (${rangeName} ${diff.names[Math.floor(punishmentInfo[1])]})`;
  document.getElementById("punishment").style.color = diff.colors[Math.floor(punishmentInfo[1])];
  document.getElementById("punishment").style.textShadow = Math.floor(punishmentInfo[1])==6?"0 0 2px #ffffff,0 0 1px #ffffff":"none";
  document.getElementById("container") = utils.formatModif();
  } catch (e) {
    document.getElementById("punishment").innerHTML = `${e.name} occured (${e.stack})`;
  }
};