const req = "0 300 650 1100 1450 2100 2550 3100 3950 5050 6200 7350 8500 9750 11100 12300 13550 15600 17800 20050 22100 24200 26750 29800 32150 35700 39100 42500 46000 50100 55700".split(" ").map(Number);
const keyframes = [[55, 51, 85], [139, 54, 80], [182, 65, 80], [208, 66, 80], [242, 53, 84], [253, 76, 74], [238, 94, 74]];
const reqAlt = "0 4 8 11 16 19 22 27 32 38 45 54 64 76 90 107 128 170 256 362 512 1000".split(" ").map(Number);
const altRoles = "Normal,Known Member,Social Noob,Social Member,Social Pro,Social Master,Social Legend,Chatty Noob,Chatty Pro,Chatty Master,Talkative Noob,Talkative Pro,Talkative Master,Mega TWer,Giga TWer,Tera TWer,Peta TWer,Exa TWer,Zetta TWer,Yotta TWer,Ronna TWer,Quetta TWer".split(",");
const altColors = "254,254,254 255,251,0 255,170,0 255,85,0 255,0,0 170,0,0 85,0,0 85,0,85 85,0,170 85,0,255 170,0,255 255,0,255 255,0,170 255,0,85 0,0,255 0,85,255 0,170,255 0,255,255 0,255,170 0,255,85 0,255,0 0,170,0".split(" ").map(a => a.split(",").map(function(b) { return (Number(b) + 256).toString(16).slice(1) }).join(""));
let xp = Number(localStorage.polarisXP ?? "0"), lvl = 0, tsChat = 0, tsCanvas = 0, lvlProgress = 0, roleProgress = 0, isAlt = eval(localStorage.polarisUseAlternative ?? "false"), showTag = eval(localStorage.polarisShowTag ?? "true");
function getLvl(n) {
  let r = Math.round;
  if (n <= 55700) {
    let l = 0;
    while ((req[l] ?? 55700) <= n) {
      l++;
    };
    l--;
    return l;
  } else if (n <= r(55700 * 1.05 ** 20)) { // WHY SO SPECIFIC???
    let t = n / 55700;
    return 30 + Math.floor(Math.log10(t) / Math.log10(1.05))
  } else if (n <= r(55700 * 1.05 ** 20 * 1.03 ** 25)) {
    let t = n / r(55700 * 1.05 ** 20);
    return 50 + Math.floor(Math.log10(t) / Math.log10(1.03))
  } else if (n <= r(55700 * 1.05 ** 20 * 1.03 ** 25 * 1.025 ** 25)) {
    let t = n / r(55700 * 1.05 ** 20 * 1.03 ** 25);
    return 75 + Math.floor(Math.log10(t) / Math.log10(1.025))
  } else if (n <= r(55700 * 1.05 ** 20 * 1.03 ** 25 * 1.025 ** 25 * 1.015 ** 25)) {
    let t = n / r(55700 * 1.05 ** 20 * 1.03 ** 25 * 1.025 ** 25);
    return 100 + Math.floor(Math.log10(t) / Math.log10(1.015))
  } else if (n <= r(55700 * 1.05 ** 20 * 1.03 ** 25 * 1.025 ** 25 * 1.015 ** 25 * 1.01 ** (1000 - 125))) {
    let t = n / r(55700 * 1.05 ** 20 * 1.03 ** 25 * 1.025 ** 25 * 1.015 ** 25);
    return 125 + Math.floor(Math.log10(t) / Math.log10(1.01))
  } else { return 1000 }
}
function getLvlReq(l) {
  let r = Math.round;
  if (l <= 30) {
    return req[l];
  } else if (l <= 50) {
    return r(55700 * 1.05 ** (l - 30));
  } else if (l <= 75) {
    return r(55700 * 1.05 ** 20 * 1.03 ** (l - 50));
  } else if (l <= 100) {
    return r(55700 * 1.05 ** 20 * 1.03 ** 25 * 1.025 ** (l - 75));
  } else if (l <= 125) {
    return r(55700 * 1.05 ** 20 * 1.03 ** 25 * 1.025 ** 25 * 1.015 ** (l - 100));
  } else if (l <= 1000) {
    return r(55700 * 1.05 ** 20 * 1.03 ** 25 * 1.025 ** 25 * 1.015 ** 25 * 1.01 ** (l - 125));
  } else if (l > 1000) {
    return Infinity;
  } else {
    return Infinity;
  }
}
function HSVtoRGB(h, s, v) {
  h /= 360;
  s /= 100;
  v /= 100;
  h = ((h % 1) + 1) % 1;
  s = Math.min(1, Math.max(0, s));
  v = Math.min(1, Math.max(0, v));
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
      s = h.s, v = h.v, h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)].map(function(a) { return (a + 256).toString(16).slice(1) }).join("")
}
function ler(a, b, t) { // lerp
  return a + (b - a) * t
}
function interpolateCol(a, b, t) {
  let arrA = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  let arrB = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  return "#" + arrA.map((r, i) => ler(r, arrB[i], t)).map(function(c) { return (Math.round(c) + 256).toString(16).slice(1) }).join("");
}
function getColor(n) {
  let er = Math.min(5, Math.floor(n));
  let er2 = n > 5 ? n - 5 : n % 1;
  return HSVtoRGB(...(keyframes[er].map((n, r) => ler(n, keyframes[er + 1][r], er2))));
}
function getTag(l, alt = false) {
  const ar = getTagInfo(l, alt);
  return `<start ${ar[0]}>[${ar[1]}]<end>`;
}
function getTagInfo(l, alt = false) {
  if (alt) {
    let t = 0;
    while ((reqAlt[t] ?? Infinity) <= l) {
      t++;
    };
    t--;
    return [`#${altColors[t]}`, altRoles[t]];
  } else {
    let normalizedLvl = Math.floor(l / (l > 100 ? 10 : 5)) * (l > 100 ? 10 : 5);
    return [`#${getColor((Math.floor(l / (l > 100 ? 10 : 5)) + (l > 100 ? 10 : 0)) / 5)}`, `${normalizedLvl == 0 ? "TextWaller" : `Server Level ${normalizedLvl.toLocaleString("en-US")}`}`];
  }
}
function getRoleIdx(l, alt = false) {
  if (alt) {
    let t = 0;
    while ((reqAlt[t] ?? Infinity) <= l) {
      t++;
    };
    t--;
    return t;
  } else {
    return Math.floor(l / (l > 100 ? 10 : 5)) + (l > 100 ? 10 : 0);
  }
}
function getRoleReq(rl, alt = false) {
  if (alt) {
    return reqAlt[rl];
  } else {
    return rl * (rl > 19 ? 10 : 5) - (rl > 19 ? 100 : 0);
  }
}
function _$(id) {
  return document.getElementById(id);
}
w.on("writeBefore", () => {
  if (Date.now() - tsCanvas >= 1e4) {
    xp += Math.floor(Math.random() * 5) + 1;
    tsCanvas = Date.now();
  };
});
w.on("chatBefore", () => {
  if (Date.now() - tsChat >= 3e4) {
    xp += Math.floor(Math.random() * 45) + 45;
    tsChat = Date.now();
  };
});
w.on("chatBefore", (d) => {
  if (showTag) {
    d.msg[0] = `${getTag(lvl, isAlt)} ${d.msg[0]}`;
  };
});
let style = document.createElement("style");
style.innerHTML = `
#polarisDisplay {
  position: fixed;
  top: 20px;
  width: min(calc(100dvw - 20px), 450px);
}
#polarisDisplay > * {
  margin: auto;
  width: min(calc(100dvw - 20px), 450px);
  text-align: center;
  color: #fff;
}
#polarisProgressBar {
  position: absolute;
  top: 0;
  width: min(calc(100dvw - 20px), 450px);
  height: 20px;
  border-radius: 20px;
  background-image: linear-gradient(to right, #fff 0%, #222 0%);
  border: 2px solid #444;
}
#polarisRoleProgressBar {
  position: absolute;
  top: 45px;
  width: min(calc(100dvw - 20px), 450px);
  height: 5px;
  background-image: linear-gradient(to right, #fff8 0%, #0000 0%);
  z-index: -1;
}
.polarisStatContainer {
  position: absolute;
  top: 0;
}
.polarisStatContainer * {
  width: min(calc(100dvw - 20px), 450px);
  height: 20px;
  text-align: center;
  text-shadow: 0 0 1px #000, 0 0 2px #000, 0 0 4px #000;
}
#polarisRole {
  position: absolute;
  top: 0;
  font-size: 1.5em;
  font-weight: bold;
}
#polarisLvl {
  position: absolute;
  top: 30px;
}
#polarisXP {
  position: absolute;
  top: 50px;
  font-size: 0.75em;
}
.polarisLevelRequirements {
  position: absolute;
  top: 10px;
  font-size: 0.75em;
}
#polarisCurrentLvlXP {
  position: absolute;
  width: min(calc(100dvw - 20px), 450px);
  text-align: left;
}
#polarisNextLvlXP {
  position: absolute;
  width: min(calc(100dvw - 20px), 450px);
  text-align: right;
}
#polarisSettingsButton {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: -80px;
  height: 20px;
  width: 70px;
  border-radius: 20px;
  background-image: none;
  border: 2px solid #444;
  background-color: #222;
  color: #fff;
  font-size: 0.7em;
}
#polarisSettingsButton:hover {
  filter: brightness(150%);
}
#polarisSettingsButton:active {
  filter: brightness(200%);
}
#polarisSettings {
  position: absolute;
  opacity: 0;
  text-align: left;
  top: 25px;
  right: -210px;
  height: 50px;
  width: 190px;
  border-radius: 10px;
  background-image: none;
  border: 2px solid #444;
  background-color: #222;
  color: #fff;
  font-size: 0.7em;
  transform: translateY(-300px);
  word-wrap: break-word;
  transition: all 0.3s;
  padding: 4px;
}
#polarisSettings.shown {
  opacity: 1;
  transform: translateY(0px);
}
`;
document.head.appendChild(style);
let container = document.createElement("div");
container.id = "polarisDisplay";
container.innerHTML = `
<div id="polarisProgressBar"></div>
<div id="polarisRoleProgressBar"></div>
<div class="polarisStatContainer">
  <div class="polarisLevelRequirements">
    <p id="polarisCurrentLvlXP">0 XP</p>
    <p id="polarisNextLvlXP">300 XP</p>
  </div>
  <div id="polarisRole"><p>TextWaller</p></div>
  <div id="polarisLvl"><p>Level 0</p></div>
  <div id="polarisXP"><p>0 XP</p></div>
</div>
<div id="polarisSettingsButton"><p>Settings</p></div>
<div id="polarisSettings">
  <form>
    <input type="checkbox" id="polarisUseAltRoles"></input>
    <label for="polarisUseAltRoles">Use alternative roles</label><br>
    <input type="checkbox" id="polarisShowTag"></input>
    <label for="polarisShowTag">Show tag</label>
  </form>
</div>
`;
document.getElementsByClassName("container")[0].appendChild(container);
_$("polarisUseAltRoles").checked = isAlt;
_$("polarisShowTag").checked = showTag;
setInterval(() => { try {
lvl = getLvl(xp);
lvlProgress += ((lvl == 1000 ? 100 : (xp - getLvlReq(lvl)) / (getLvlReq(lvl + 1) - getLvlReq(lvl)) * 100) - lvlProgress) / 8;
let role = getRoleIdx(lvl, isAlt);
roleProgress += ((lvl == 1000 ? 100 : (lvl - getRoleReq(role, isAlt)) / (getRoleReq(role + 1, isAlt) - getRoleReq(role, isAlt)) * 100) - roleProgress) / 8;
_$("polarisXP").innerHTML = `<p>${xp.toLocaleString("en-US")} XP</p>`;
_$("polarisLvl").innerHTML = `<p>Level ${lvl.toLocaleString("en-US")}</p>`;
_$("polarisRole").innerHTML = `<p>${getTagInfo(lvl, isAlt)[1]}</p>`;
_$("polarisRole").style.color = getTagInfo(lvl, isAlt)[0];
_$("polarisProgressBar").style.backgroundImage = `linear-gradient(to right, ${lvl == 1000 ? `hsl(${(Date.now() / 5e3) % 1 * 360}deg, 100%, 50%)` : getTagInfo(lvl, isAlt)[0]} ${lvlProgress}%, #222 ${lvlProgress}%)`;
_$("polarisRoleProgressBar").style.backgroundImage = lvl == 1000 ? `linear-gradient(hsla(${(Date.now() / 5e3) % 1 * 360}deg, 100%, 50%, 50%))` : `linear-gradient(to right, ${getTagInfo(lvl, isAlt)[0]}80 0%, ${interpolateCol(getTagInfo(lvl, isAlt)[0], getTagInfo(getRoleReq(role + 1, isAlt), isAlt)[0], roleProgress / 100)}80 ${roleProgress}%, #2220 ${roleProgress}%)`;
_$("polarisCurrentLvlXP").innerHTML = `${getLvlReq(lvl).toLocaleString("en-US")} XP`;
_$("polarisNextLvlXP").innerHTML = `${getLvlReq(lvl + 1).toLocaleString("en-US")} XP`;
isAlt = _$("polarisUseAltRoles").checked;
showTag = _$("polarisShowTag").checked;
localStorage.setItem("polarisXP", xp.toString());
localStorage.setItem("polarisUseAlternative", isAlt.toString());
localStorage.setItem("polarisShowTag", showTag.toString());
} catch (err) {
  console.log(err.stack)
};
}, 30);
_$("polarisSettingsButton").addEventListener("click", () => {
  _$("polarisSettings").classList.toggle("shown");
})
