let pts = Number(localStorage["ranks_points"] ?? 0), timestamp = Date.now(), ptsQueue = 0, lastTime = Date.now() - 16;
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
  ["A", 14_000, "-webkit-text-stroke:0.3px #080;color:#0f0"],
  ["A+", 18_000, "-webkit-text-stroke:0.3px #083;color:#0f6"],
  ["S-", 25_000, `-webkit-text-stroke:0.3px #0c8;${gradient("linear-gradient(135deg, #fff, #0fb, #fff)")}`],
  ["S", 35_000, `-webkit-text-stroke:0.3px #0ff;${gradient("linear-gradient(135deg, #fff, #0ff, #fff)")}`],
  ["S+", 50_000, `-webkit-text-stroke:0.3px #0f0;${gradient("linear-gradient(135deg, #fff, #0f0, #fff)")}`],
  ["SS-", 75_000, `-webkit-text-stroke:0.3px #8f0;${gradient("linear-gradient(135deg, #fff, #8f0, #fff)")}`],
  ["SS", 100_000, `-webkit-text-stroke:0.3px #ff0;${gradient("linear-gradient(135deg, #fff, #ff0, #fff, #ff0, #fff)")}`]
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
let ptsChange = Math.floor(((Date.now() - lastTime) / 1000) * 512);
ptsChange = ptsQueue - ptsChange < 0 ? ptsQueue : ptsChange;
ptsQueue -= ptsChange;
pts += ptsChange;
lastTime = Date.now();
}, 15)
