/* tag version */let pts = Number(localStorage["ranks_points"] ?? 0), timestamp = Date.now(), ptsQueue = 0, lt = Date.now() - 16, tag = "";
w.on("writeBefore", ()=>{
  ptsQueue++
});
w.on("chatBefore", (d)=>{
  let m = d.msg[0] ?? d.msg[1];
  ptsQueue += m.length < 5 ? m.length : Math.floor(5 * (m.length / 5) ** 0.75)
});
function gradient(s) {
  return `background:${s};background-clip:text!important;-webkit-background-clip:text!important;-webkit-text-fill-color:transparent;`
}
function HSVtoRGB(h, s, v) {
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
function abbrev(num) {
  if (num < 1e6) {
    return num.toLocaleString("en-US")
  } else {
    let prefixes = ["", "k", "M", "B", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No",
                   ...["", "U", "D", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No"].map(a => `${a}Dc`),
                   ...["", "U", "D", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No"].map(a => `${a}Vg`),
                   ...["", "U", "D", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No"].map(a => `${a}Tg`),
                   ...["", "U", "D", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No"].map(a => `${a}qg`),
                   ...["", "U", "D", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No"].map(a => `${a}Qg`),
                   ...["", "U", "D", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No"].map(a => `${a}sg`),
                   ...["", "U", "D", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No"].map(a => `${a}Sg`),
                   ...["", "U", "D", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No"].map(a => `${a}Og`),
                   ...["", "U", "D", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No"].map(a => `${a}Ng`),
                   ...["", "U", "D", "T", "Qd", "Qn", "Sx", "Sp", "Oc", "No"].map(a => `${a}Ce`)];
    return `${(num / 1e3 ** Math.floor(Math.log10(num) / 3)).toPrecision(4)} ${prefixes[Math.floor(Math.log10(num) / 3)]}`
  }
}
const ranks = [
  // [rank, pointRequirement, style]
  ["F--", 0, "color:#800"],
  ["F-", 100, "color:#c00"],
  ["F", 250, "color:#f00"],
  ["F+", 400, "color:#f30"],
  ["D-", 700, "color:#f60"],
  ["D", 1_000, "color:#f80"],
  ["D+", 1_500, "color:#fb0"],
  ["C-", 2_000, "color:#fd0"],
  ["C", 2_500, "color:#ff0"],
  ["C+", 3_000, "color:#df0"],
  ["B-", 4_500, "color:#bf0"],
  ["B", 6_000, "color:#8f0"],
  ["B+", 8_000, "color:#6f0"],
  ["A-", 10_000, "color:#3f0"],
  ["A", 14_000, "-webkit-text-stroke:2.5px #080;color:#0f0"],
  ["A+", 18_000, "-webkit-text-stroke:2.5px #083;color:#0f6"],
  ["S-", 25_000, `-webkit-text-stroke:2px #086;${gradient("linear-gradient(120deg, #fff, #0fb, #fff, #0fb, #fff)")}`],
  ["S", 35_000, `-webkit-text-stroke:2px #088;${gradient("linear-gradient(120deg, #fff, #0ff, #fff, #0ff, #fff)")}`],
  ["S+", 50_000, `-webkit-text-stroke:2px #080;${gradient("linear-gradient(120deg, #fff, #0f0, #fff, #0f0, #fff)")}`],
  ["SS-", 75_000, `-webkit-text-stroke:2px #480;${gradient("linear-gradient(120deg, #fff, #8f0, #fff, #8f0, #fff)")}`],
  ["SS", 100_000, `-webkit-text-stroke:2px #880;${gradient("linear-gradient(120deg, #fff, #ff0, #fff, #ff0, #fff, #ff0, #fff)")}`],
  ["SS+", 140_000, `-webkit-text-stroke:2px #f0f;${gradient("linear-gradient(120deg, #fff, #f8f, #fff, #f8f, #fff, #f8f, #fff)")}`],
  ["X-", 180_000, `-webkit-text-stroke:2px #00f;${gradient("linear-gradient(120deg, #f00, #00f, #f00, #00f, #f00)")}`],
  ["X", 250_000, `-webkit-text-stroke:2px #f08;${gradient("linear-gradient(30deg, #f08, #0f8, #f08)")}`],
  ["X+", 300_000, `-webkit-text-stroke:2px #f0f;${gradient("linear-gradient(60deg, #f8f, #888, #f8f, #888, #f8f)")}`],
  ["XX-", 350_000, `-webkit-text-stroke:2px #084;${gradient("linear-gradient(30deg, #0f8, #0ff, #08f, #00f)")}`],
  ["XX", 400_000, `-webkit-text-stroke:2px #f00;${gradient("linear-gradient(120deg, #f00, #f80, #ff0, #8f0, #0f0)")}`],
  ["XX+", 500_000, `-webkit-text-stroke:2px #fff;${gradient("linear-gradient(30deg, #fff, #000, #fff, #000)")}`],
  ["W-", 600_000, `-webkit-text-stroke:2px #f80;${gradient("linear-gradient(120deg, #f80, #ff0, #8f0, #0f0, #0f8, #0ff, #08f, #00f)")}`],
  ["W", 750_000, `-webkit-text-stroke:2px #066;${gradient("linear-gradient(60deg, #066, #0ff, #fff, #0ff, #066)")}`],
  ["W+", 900_000, `-webkit-text-stroke:2px #88f;${gradient("linear-gradient(60deg, #f0f, #0f0, #f0f, #0f0, #f0f)")}`],
  ["WW-", 1_200_000, `-webkit-text-stroke:2px #ff0;${gradient("linear-gradient(120deg, #ff0, #f0f, #ff0)")}`],
  ["WW", 1_500_000, `-webkit-text-stroke:2px #0f0;${gradient("linear-gradient(150deg, #0f0, #f00, #0f0)")}`],
  ["WW+", 1_800_000, `-webkit-text-stroke:2px #0ff;${gradient("linear-gradient(210deg, #0ff, #ff0, #0ff)")}`],
  ["P-", 2_500_000, `-webkit-text-stroke:2px #00f;${gradient("linear-gradient(240deg, #00f, #0f0, #00f)")}`],
  ["P", 3_000_000, `-webkit-text-stroke:2px #0f0;${gradient("linear-gradient(120deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)")}`],
  ["P+", 3_500_000, `-webkit-text-stroke:2px #f0f;${gradient("linear-gradient(-120deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)")}`],
  ["U-", 5_000_000, `-webkit-text-stroke:2px #00f;${gradient("linear-gradient(120deg, #00f, #000, #00f, #000, #00f)")}`],
  ["U", 7_000_000, `-webkit-text-stroke:2px #ff0;${gradient("linear-gradient(120deg, #ff0, #000, #ff0, #000, #ff0)")}`],
  ["U+", 9_000_000, `-webkit-text-stroke:2px #fff;${gradient("linear-gradient(60deg, #f00, #0f0, #00f, #0f0, #f00)")}`],
  ["UU-", 12_500_000, `-webkit-text-stroke:2px #f0f;animation: rainbow 3s linear infinite`],
  ["UU", 15_000_000, `-webkit-text-stroke:2px #0ff;animation: rainbow 2s linear infinite`],
  ["UU+", 18_000_000, `-webkit-text-stroke:2px #fff;animation: anim1 3s linear infinite`],
  ["M-", 22_500_000, `animation: anim2 2.5s linear infinite;${gradient("linear-gradient(60deg, #0000, #000c, #0000)")}`],
  ["M", 27_500_000, `animation: anim3 2.5s linear infinite;${gradient("linear-gradient(60deg, #0000, #000c, #0000)")}`],
  ["M+", 35_000_000, `animation: anim4 2.5s linear infinite;${gradient("linear-gradient(60deg, #0000, #000c, #0000)")}`],
  ["MM-", 50_000_000, `animation: anim5 2.5s linear infinite;${gradient("linear-gradient(60deg, #fff0, #fffc, #fff0)")}`],
  ["MM", 75_000_000, `animation: anim6 2s linear infinite;${gradient("linear-gradient(60deg, #fff0, #fffc, #fff0)")}`],
  ["MM+", 100_000_000, `animation: anim7 1.6s linear infinite;${gradient("linear-gradient(60deg, #fff0, #fffc, #fff0)")}`],
  ["O-", 125_000_000, `animation: anim8 3s linear infinite;${gradient("linear-gradient(30deg, #0ff0, #0ff8, #0ff0)")}`],
  ["O", 160_000_000, `animation: anim8 2s linear infinite;${gradient("linear-gradient(30deg, #0ff0, #0ff8, #0ff0, #0ff8, #0ff0)")}`],
  ["O+", 200_000_000, `animation: anim9 2s linear infinite;${gradient("linear-gradient(30deg, #fff0, #fff8, #fff0)")}`],
  ["OO-", 250_000_000, `animation: anim10 2s linear infinite;${gradient("linear-gradient(30deg, #fff0, #fff8, #fff0)")}`],
  ["OO", 300_000_000, `animation: anim11 3s linear infinite;${gradient("linear-gradient(60deg, #0f00, #0f08, #0f00)")}`],
  ["OO+", 400_000_000, `animation: anim11 2s linear infinite;${gradient("linear-gradient(60deg, #0f00, #0f08, #0f00, #0f08, #0f00)")}`],
  ["R-", 500_000_000, `animation: anim11 1.5s linear infinite;${gradient("linear-gradient(60deg, #0f00, #0f08, #0f00, #0f08, #0f00)")}`],
  ["R", 650_000_000, `animation: anim12 4s linear infinite;${gradient("linear-gradient(60deg, #0000, #80f8, #f0f8, #80f8, #0000)")}`],
  ["R+", 800_000_000, `animation: anim12 3s linear infinite;${gradient("linear-gradient(30deg, #0000, #80f8, #f0f8, #80f8, #0000)")}`],
  ["RR-", 1_000_000_000, `animation: anim12 2s linear infinite;${gradient("linear-gradient(120deg, #0000, #80f8, #f0f8, #80f8, #0000)")}`],
  ["RR", 1_250_000_000, `animation: anim12 1.5s linear infinite;${gradient("linear-gradient(0deg, #0000, #80f8, #f0f8, #80f8, #0000)")}`],
  ["RR+", 1_750_000_000, `animation: anim13 5s linear infinite;${gradient("linear-gradient(60deg, #0000, #fff8, #8888, #0ff8, #8888, #fff8, #0000)")}`]
];
function getRankIdx() {
  for (let i in ranks) {
    if (pts >= ranks[i][1]) continue;
    return i - 1;
  };
  return ranks.length - 1;
}
let style = document.createElement("style");
style.innerHTML = `
#rankContainer {
  position: fixed;
  top: 330px;
  right: 0;
  width: 125px;
  height: 150px;
  background-image: linear-gradient(to left, #222c, #2220);
  text-align: right;
  padding: 5px;
  color: #fff;
}
#rankContainer > * {
  display: inline-block;
  position: absolute;
  margin: 0;
  right: 5px;
  white-space: nowrap;
}
.rankContainer_textThing {
  top: 5px;
  text-shadow: 2px 2px #000;
}
#rankContainer_points {
  bottom: 5px;
  text-shadow: 2px 2px #000;
}
#rankContainer_rank {
  top: 50%;
  transform: translateY(-50%);
  font-size: 5em;
  font-weight: 700;
  max-width: 100dvw;
}
#rankContainer_rankProgress {
  bottom: 28px;
  height: 4px;
  width: 200px;
  right: 5px;
  background-image: linear-gradient(to right, #8880, #888f);
  transition: width 0.5s, right 0.5s;
}
@keyframes anim1 {
  0% { color: #000 }
  50% { color: #fff }
  100% { color: #000 }
}
@keyframes anim2 {
  0% { -webkit-text-stroke:2px #fff; background-color:#000; }
  50% { -webkit-text-stroke:2px #000; background-color:#fff; }
  100% { -webkit-text-stroke:2px #fff; background-color:#000; }
}
@keyframes anim3 {
  0% { -webkit-text-stroke:2px #ff0; background-color:#000; }
  50% { -webkit-text-stroke:2px #000; background-color:#ff0; }
  100% { -webkit-text-stroke:2px #ff0; background-color:#000; }
}
@keyframes anim4 {
  0% { -webkit-text-stroke:2px #0ff; background-color:#000; }
  50% { -webkit-text-stroke:2px #000; background-color:#0ff; }
  100% { -webkit-text-stroke:2px #0ff; background-color:#000; }
}
@keyframes anim5 {
  0% { -webkit-text-stroke:2px #f0f; background-color:#fff; }
  50% { -webkit-text-stroke:2px #fff; background-color:#f0f; }
  100% { -webkit-text-stroke:2px #f0f; background-color:#fff; }
}
@keyframes anim6 {
  0% { -webkit-text-stroke:2px #0f0; background-color:#fff; }
  50% { -webkit-text-stroke:2px #fff; background-color:#0f0; }
  100% { -webkit-text-stroke:2px #0f0; background-color:#fff; }
}
@keyframes anim7 {
  0% { -webkit-text-stroke:2px #f0f; background-color:#ff0; }
  50% { -webkit-text-stroke:2px #ff0; background-color:#f0f; }
  100% { -webkit-text-stroke:2px #f0f; background-color:#ff0; }
}
@keyframes anim8 {
  0% { -webkit-text-stroke:2px #00f; background-color:#08f; }
  50% { -webkit-text-stroke:2px #08f; background-color:#00f; }
  100% { -webkit-text-stroke:2px #00f; background-color:#08f; }
}
@keyframes anim9 {
  0% { -webkit-text-stroke:2px #f00; background-color:#0ff; }
  33% { -webkit-text-stroke:2px #0f0; background-color:#f0f; }
  66% { -webkit-text-stroke:2px #00f; background-color:#ff0; }
  100% { -webkit-text-stroke:2px #f00; background-color:#0ff; }
}
@keyframes anim10 {
  0% { -webkit-text-stroke:2px #0ff; background-color:#f00; }
  33% { -webkit-text-stroke:2px #f0f; background-color:#0f0; }
  66% { -webkit-text-stroke:2px #ff0; background-color:#00f; }
  100% { -webkit-text-stroke:2px #0ff; background-color:#f00; }
}
@keyframes anim11 {
  0% { -webkit-text-stroke:2px #0f0; background-color:#0ff; }
  50% { -webkit-text-stroke:2px #0ff; background-color:#0f0; }
  100% { -webkit-text-stroke:2px #0f0; background-color:#0ff; }
}
@keyframes anim12 {
  0% { -webkit-text-stroke:2px #000; background-color:#f0f; }
  25% { -webkit-text-stroke:2px #80f; background-color:#0f0; }
  50% { -webkit-text-stroke:2px #f0f; background-color:#000; }
  75% { -webkit-text-stroke:2px #80f; background-color:#0f0; }
  100% { -webkit-text-stroke:2px #000; background-color:#f0f; }
}
@keyframes anim13 {
  0% { -webkit-text-stroke:2px #000; background-color:#000; }
  8.3% { -webkit-text-stroke:2px #43f; background-color:#fff; }
  16.6% { -webkit-text-stroke:2px #0f8; background-color:#f00; }
  25% { -webkit-text-stroke:2px #084; background-color:#0f0; }
  33.3% { -webkit-text-stroke:2px #80f; background-color:#00f; }
  41.6% { -webkit-text-stroke:2px #ff0; background-color:#0ff; }
  50% { -webkit-text-stroke:2px #f0f; background-color:#f0f; }
  58.3% { -webkit-text-stroke:2px #0ff; background-color:#ff0; }
  66.6% { -webkit-text-stroke:2px #00f; background-color:#80f; }
  75% { -webkit-text-stroke:2px #0f0; background-color:#084; }
  83.3% { -webkit-text-stroke:2px #f00; background-color:#0f8; }
  91.6% { -webkit-text-stroke:2px #fff; background-color:#43f; }
  100% { -webkit-text-stroke:2px #000; background-color:#000; }
}
`;
document.head.append(style);
let rankContainer = document.createElement("div");
rankContainer.id = "rankContainer";
rankContainer.innerHTML = `
<p class="rankContainer_textThing">Your rank:</p>
<div id="rankContainer_rank">
F
</div>
<div id="rankContainer_rankProgress"></div>
<p id="rankContainer_points">Points: 0</p>
`;
document.body.appendChild(rankContainer);
setInterval(()=>{
let r = getRankIdx();
document.getElementById("rankContainer_points").innerHTML = `Points: ${pts.toLocaleString("en-US")}`;
document.getElementById("rankContainer_rank").innerHTML = ranks[r][0];
document.getElementById("rankContainer_rank").style = ranks[r][2];
if (r == ranks.length - 1) {
  document.getElementById("rankContainer_rankProgress").style = `background-image: linear-gradient(to right, hsl(${((Date.now() - timestamp) % 3e3) / 3e3 * 360} 100% 50% / 0), hsl(${((Date.now() - timestamp) % 3e3) / 3e3 * 360} 100% 50%)`;
} else {
  document.getElementById("rankContainer_rankProgress").style.width = `${(pts - ranks[r][1]) / (ranks[r + 1][1] - ranks[r][1]) * 200}px`;
  document.getElementById("rankContainer_rankProgress").style.right = `${205 - (pts - ranks[r][1]) / (ranks[r + 1][1] - ranks[r][1]) * 200}px`;
};
localStorage.setItem("ranks_points", pts.toString());
if (ptsQueue > 2e3) { ptsQueue = 0 };
let ptsChange = Math.floor(((Date.now() - lt) / 1000) * 512);
ptsChange = ptsQueue - ptsChange < 0 ? ptsQueue : ptsChange;
ptsQueue -= ptsChange;
pts += ptsChange;
lt = Date.now();
tag = `<start #${HSVtoRGB(r < 15 ? ((r / 15 / 3) % 1) : ((1 / 3 + (r - 15) / 9) % 1), r < 15 ? 1 : (Math.sin((r - 15) * Math.PI / 4 + Math.PI / 2) + 1) / 2 * 0.75 + 0.25, 1)}>[${ranks[r][0]} | ${abbrev(pts)} pts]<end>`
}, 15);
w.on("chatBefore", (d)=>{
d.msg[0] = `${tag} ${d.msg[0]}`
});
