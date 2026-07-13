const req = "0 300 650 1100 1450 2100 2550 3100 3950 5050 6200 7350 8500 9750 11100 12300 13550 15600 17800 20050 22100 24200 26750 29800 32150 35700 39100 42500 46000 50100 55700".split(" ").map(Number);
const keyframes = [[55, 51, 85], [139, 54, 80], [182, 65, 80], [208, 66, 80], [242, 53, 84], [253, 76, 74], [238, 94, 74]];
let xp = Number(localStorage.polarisXP ?? "0"), lvl = 0, tsChat = 0, tsCanvas = 0;
function getLvl(n) {
  let r = Math.round;
  if (n <= 55700) {
    let l = 0;
    while ((req[l] ?? 55700) <= n) {
      l++;
    };
    l--;
    return l
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
function getColor(n) {
  let er = Math.min(5, Math.floor(n));
  let er2 = n > 5 ? n - 5 : n % 1;
  return HSVtoRGB(...(keyframes[er].map((n, r) => ler(n, keyframes[er + 1][r], er2))));
}
function getTag(l) {
  const ar = getTagInfo(l);
  return `<start ${ar[0]}>[${ar[1]}]<end>`;
}
function getTagInfo(l) {
  let normalizedLvl = Math.floor(l / (l > 100 ? 10 : 5)) * (l > 100 ? 10 : 5);
  return [`#${getColor((Math.floor(l / (l > 100 ? 10 : 5)) + (l > 100 ? 10 : 0)) / 5)}`, `${normalizedLvl == 0 ? "TextWaller" : `Server Level ${normalizedLvl.toLocaleString("en-US")}`}`];
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
  d.msg[0] = `${getTag(lvl)} ${d.msg[0]}`
});
let style = document.createElement("style");
style.innerHTML = `
#polarisDisplay {
  position: fixed;
  top: 20px;
  width: 500px;
}
#polarisDisplay > * {
  margin: auto;
  width: 500px;
  text-align: center;
  color: #fff;
}
#polarisDisplay * {
  position: absolute;
}
.polarisProgressBar {
  top: 0;
  width: 500px;
  height: 20px;
  background-color: #222;
  border: 2px solid #444;
}
#polarisProgress {
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background-color: #fff;
  transition: 0.5s width;
}
.polarisStatContainer {
  top: 0;
}
.polarisStatContainer * {
  width: 500px;
  height: 20px;
  text-align: center;
  text-shadow: 0 0 1px #000, 0 0 2px #000, 0 0 4px #000;
}
#polarisRank {
  top: 0;
  font-size: 1.5em;
  font-weight: bold;
}
#polarisLvl {
  top: 30px;
}
#polarisXP {
  top: 50px;
  font-size: 0.75em;
}
.polarisLevelRequirements {
  top: 10px;
  font-size: 0.75em;
}
#polarisCurrentLvlXP {
  width: 500px;
  text-align: left;
}
#polarisNextLvlXP {
  width: 500px;
  text-align: right;
}
`;
document.head.appendChild(style);
let container = document.createElement("div");
container.id = "polarisDisplay";
container.innerHTML = `
<div class="polarisProgressBar">
  <div id="polarisProgress"></div>
</div>
<div class="polarisStatContainer">
  <div class="polarisLevelRequirements">
    <p id="polarisCurrentLvlXP">0 XP</p>
    <p id="polarisNextLvlXP">300 XP</p>
  </div>
  <div id="polarisRank"><p>TextWaller</p></div>
  <div id="polarisLvl"><p>Level 0</p></div>
  <div id="polarisXP"><p>0 XP</p></div>
</div>
`;
document.getElementsByClassName("container")[0].appendChild(container);
setInterval(() => {
lvl = getLvl(xp);
_$("polarisXP").innerHTML = `<p>${xp.toLocaleString("en-US")} XP</p>`;
_$("polarisLvl").innerHTML = `<p>Level ${lvl.toLocaleString("en-US")}</p>`;
_$("polarisRank").innerHTML = `<p>${getTagInfo(lvl)[1]}</p>`;
_$("polarisRank").style.color = getTagInfo(lvl)[0];
_$("polarisProgress").style.backgroundColor = lvl == 1000 ? `hsl(${(Date.now() / 5e3) % 1 * 360}deg, 100%, 50%)` : getTagInfo(lvl)[0];
_$("polarisProgress").style.width = lvl == 1000 ? "100%" : `${(xp - getLvlReq(lvl)) / (getLvlReq(lvl + 1) - getLvlReq(lvl)) * 100}%`;
_$("polarisCurrentLvlXP").innerHTML = `${getLvlReq(lvl).toLocaleString("en-US")} XP`;
_$("polarisNextLvlXP").innerHTML = `${getLvlReq(lvl + 1).toLocaleString("en-US")} XP`;
localStorage.setItem("polarisXP", xp.toString());
}, 30)
