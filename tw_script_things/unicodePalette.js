// by The179UCETile
// DOMINOGUY_ PLEASE DON'T FEED THIS INTO AN AI I'M BEGGING YOU
let style = document.createElement("style");
style.innerHTML = `
#unicodePal {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: min(600px, 85vw);
  top: -177px;
  transition: top 0.5s cubic-bezier(0, 0, 0.1, 1);
  color: #fff;
}
#unicodePal.open {
  top: 0px;
}
#closeUnicodePal {
  position: absolute;
  text-align: center;
  width: 35%;
  height: 25px;
  padding: 2px;
  background-color: #666e;
  border: 2px solid #888;
  top: 177px;
  border-radius: 0 0 25px 25px;
}
#charContainer {
  position: absolute;
  height: 165px;
  width: 100%;
  background-color: #333e;
  border: 2px solid #555;
  top: 0px;
  padding: 5px;
  border-radius: 0 0 25px 25px;
}
#chars {
  position: absolute;
  top: 30px;
  width: calc(100% - 10px);
  height: 135px;
  display: grid;
  overflow: auto;
  grid-template-columns: repeat(15, 1fr);
  place-content: start center;
  gap: 5px;
}
#chars button {
  border: 2px solid #222;
  border-radius: 4px;
  background-color: #000;
  color: #fff;
  padding: 2px;
  text-align: center;
  height: 30px;
}
.groupContainer {
  position: absolute;
  width: calc(100% - 10px);
  top: 0px;
  height: 25px;
  display: grid;
  grid-template-columns: 40px auto 40px;
  gap: 5px;
}
.groupContainer button {
  background-color: #222;
  border: 2px solid #444;
  border-radius: 4px;
  color: #fff;
  padding: 2px;
}
.groupContainer div {
  background-color: #444;
  border: 2px solid #888;
  border-radius: 4px;
  padding: 2px;
  text-align: center;
}
`;
document.head.appendChild(style);
let unicodePal = document.createElement("div");
unicodePal.id = "unicodePal";
let closeBtn = document.createElement("div");
closeBtn.id = "closeUnicodePal";
closeBtn.innerHTML = "Open...";
closeBtn.addEventListener("click", () => {
  let l = unicodePal.classList;
  l.toggle("open");
  closeBtn.innerHTML = l.contains("open") ? "Close" : "Open...";
});
let charContainer = document.createElement("div");
charContainer.id = "charContainer";
charContainer.innerHTML = `
<div class="groupContainer">
  <button id="prevGroup">←</button>
  <div id="groupName">???</div>
  <button id="nextGroup">→</button>
</div>
<div id="chars"></div>
`;
unicodePal.appendChild(closeBtn);
unicodePal.appendChild(charContainer);
document.getElementsByClassName("container")[0].appendChild(unicodePal);
const characters = [
  ["Blocks", "█■▔🭶🭷🭸🭹🭺🭻▁🮀🮁🮗▐▌▞▚▛▀▜▙▄▟▗▖▝▘🮕🮖░▒▓🮐🮒🮑🮘🮙▕🮇🮈🮉🮊🮋▉▊▋▍▎▏▂▃▅▆▇🮆🮅🮄🮃🮂🭽🭾🭼🭿🭰🭱🭲🭳🭴🭵"],
  ["Slopes", "🮞🮟🮝🮜🭈🭆🭂🭍🭑🬽🭣🭧🭓🭞🭜🭘🭊🭁🭇🭄🭏🬼🭌🬿🭥🭒🭢🭕🭠🭗🭝🭚◢◣◥◤🭃🭉🬾🭎🭔🭤🭙🭟🭅🭋🭀🭐🭖🭦🭛🭡🭮🭩🭯🭨🮛🭪🭬🭫🮚🭭"],
  ["Sextants", "🬞🬭🬏🬇🬋🬃🬁🬂🬀🬠🬰🬐🬦🬹🬓🬉🬎🬄🬙🬥🬖🬢🬔🬧🬡🬒🬜🬪🬶🬳🬈🬅🬣🬘🬯🬮🬛🬫🬴🬸🬤🬗🬕🬨🬚🬩🬝🬬🬵🬱🬲🬷🬌🬍🬺🬻🬊🬆"],
  ["Box Drawing", "━┃╺╸╻╹═║╌┄┈╍┅┉╎┆┊╏┇┋┍┯┑┝┿┥┕┷┙╒╤╕╞╪╡╘╧╛╓╥╖╟╫╢╙╨╜╔╦╗╠╬╣╚╩╝╲╳╱🮭🮬🮫🮪🮣🮢🮡🮠🮦🮥🮮🮤🮧🮩🮨╭╮╰╯"],
  ["Arrows", "←↑→↓↖↗↙↘⤡⤧⇆⤨⇅⇵⇄⤩⤪"],
  ["Miscellaneous", "□◄▲►▼🮵🮶🯄🮱🮰🮷🮸🮴🮽🮾🮿🮹🮺🮻🯊🮼🯀🯁🯂🯃🯅🯆🯇🯈🮲🮳🯉🯰🯱🯲🯳🯴🯵🯶🯷🯸🯹⎞⎝⎜⎛⎠⎞"],
  ["SLC2 Blocks", "🯤🯥𜰡𜰢𜰣𜰤𜰥𜰦𜰧𜰨𜰩𜰪𜰫𜰬𜰭𜰮𜰯𜱀𜱁𜱂𜱃𜱄𜱅𜱆𜱇𜹇𜹈𜹉𜹊𜹋𜹌𜹍𜹎𜹏𜹐𜺐𜺑𜺒𜺓𜺔𜺕𜺖𜺗𜺘𜺙𜺚𜺛𜺜𜺝𜺞𜺟𜺠𜺡𜺢𜺣𜺤𜺥𜺦𜺧𜺨𜺩𜺪𜺫𜺬𜺭𜺮𜺯𜹑𜹒𜹓𜹔𜹕𜹖𜹗𜹘𜹙𜹚𜹛𜹜𜹝𜹞𜹟𜹠𜹡𜹢𜹣𜹤𜹥𜹦𜹧𜹨𜹩𜹪𜹫𜹬𜹭𜹮𜹯𜹰𜹱𜹲𜹳𜹴𜹵𜹶𜹷𜹸𜹹𜹺𜹻𜹼𜹽𜹾𜹿𜺀𜺁𜺂𜺃𜺄𜺅𜺆𜺇𜺈𜺉𜺊𜺋𜺌𜺍𜺎𜺏"],
  ["Octants", "𜺨𜺫🮂𜴀▘𜴁𜴂𜴃𜴄▝𜴅𜴆𜴇𜴈▀𜴉𜴊𜴋𜴌🯦𜴍𜴎𜴏𜴐𜴑𜴒𜴓𜴔𜴕𜴖𜴗𜴘𜴙𜴚𜴛𜴜𜴝𜴞𜴟🯧𜴠𜴡𜴢𜴣𜴤𜴥𜴦𜴧𜴨𜴩𜴪𜴫𜴬𜴭𜴮𜴯𜴰𜴱𜴲𜴳𜴴𜴵🮅𜺣𜴶𜴷𜴸𜴹𜴺𜴻𜴼𜴽𜴾𜴿𜵀𜵁𜵂𜵃𜵄▖𜵅𜵆𜵇𜵈▌𜵉𜵊𜵋𜵌▞𜵍𜵎𜵏𜵐▛𜵑𜵒𜵓𜵔𜵕𜵖𜵗𜵘𜵙𜵚𜵛𜵜𜵝𜵞𜵟𜵠𜵡𜵢𜵣𜵤𜵥𜵦𜵧𜵨𜵩𜵪𜵫𜵬𜵭𜵮𜵯𜵰𜺠𜵱𜵲𜵳𜵴𜵵𜵶𜵷𜵸𜵹𜵺𜵻𜵼𜵽𜵾𜵿𜶀𜶁𜶂𜶃𜶄𜶅𜶆𜶇𜶈𜶉𜶊𜶋𜶌𜶍𜶎𜶏▗𜶐𜶑𜶒𜶓▚𜶔𜶕𜶖𜶗▐𜶘𜶙𜶚𜶛▜𜶜𜶝𜶞𜶟𜶠𜶡𜶢𜶣𜶤𜶥𜶦𜶧𜶨𜶩𜶪𜶫▂𜶬𜶭𜶮𜶯𜶰𜶱𜶲𜶳𜶴𜶵𜶶𜶷𜶸𜶹𜶺𜶻𜶼𜶽𜶾𜶿𜷀𜷁𜷂𜷃𜷄𜷅𜷆𜷇𜷈𜷉𜷊𜷋𜷌𜷍𜷎𜷏𜷐𜷑𜷒𜷓𜷔𜷕𜷖𜷗𜷘𜷙𜷚▄𜷛𜷜𜷝𜷞▙𜷟𜷠𜷡𜷢▟𜷣▆𜷤𜷥█"],
  ["SLC2 Slopes", "𜺳𜲠𜲡"],
  ["SLC2 Box Drawing", "🯐🯑🯒🯓🯔🯕🯖🯗🯘🯙🯚🯛🯜🯝🯞🯟𜸉𜸊𜰟𜰠"],
  ["SLC2 Large Type", "𜸚𜸛𜸜𜸝𜸞𜸟𜸠𜸡𜸢𜸣𜸤𜸥𜸦𜸧𜸨𜸩𜸪𜸫𜸬𜸭𜸮𜸯𜸰𜸱𜸲𜸳𜸴𜸵𜸶𜸷𜸸𜸹𜸺𜸻𜸼𜸽𜸾𜸿𜹀𜹁𜹂𜹃𜹄𜹅𜹆"],
  ["SLC2 Miscellaneous", "🯋🯌🯍🯠🯡🯢🯣🯨🯩🯪🯫🯬🯭🯮🯯𜰀𜰁𜰂𜰃𜰄𜰅𜰆𜰇𜰈𜰉𜰊𜰋𜰌𜰍𜰎𜰏𜰐𜰑𜰒𜰓𜰔𜰕𜰖𜰗𜰘𜰙𜰚𜰛𜰜𜰝𜰞𜰰𜰱𜰲𜰳𜰴𜰵𜰶𜰷𜰸𜰹𜰺𜰻𜰼𜰽𜰾𜰿𜱈𜱉𜱊𜱋𜱌𜱍𜱎𜱏𜱐𜱑𜱒𜱓𜱔𜱕𜱖𜱗𜱘𜱙𜱚𜱛𜱜𜱝𜱞𜱟𜱠𜱡𜱢𜱣𜱤𜱥𜱦𜱧𜱨𜱩𜱪𜱫𜱬𜱭𜱮𜱯𜱰𜱱𜱲𜱳𜱴𜱵𜱶𜱷𜱸𜱹𜱺𜱻𜱼𜱽𜱾𜱿𜲀𜲁𜲂𜲃𜲄𜲅𜲆𜲇𜲈𜲉𜲊𜲋𜲌𜲍𜲎𜲏𜲐𜲑𜲒𜲓𜲔𜲕𜲖𜲗𜲘𜲙𜲚𜲛𜲜𜲝𜲞𜲟𜲢𜲣𜲤𜲥𜲦𜲧𜲨𜲩𜲪𜲫𜲬𜲭𜲮𜲯𜲰𜲱𜲲𜲳𜲴𜲵𜲶𜲷𜲸𜲹𜲺𜲻𜲼𜲽𜲾𜲿𜳀𜳁𜳂𜳃𜳄𜳅𜳆𜳇𜳈𜳉𜳊𜳋𜳌𜳍𜳎𜳏𜳐𜳑𜳒𜳓𜳔𜳕𜳖𜳗𜳘𜳙𜳚𜳛𜳜𜳝𜳞𜳟𜳠𜳡𜳢𜳣𜳤𜳥𜳦𜳧𜳨𜳩𜳪𜳫𜳬𜳭𜳮𜳯𜳰𜳱𜳲𜳳𜳴𜳵𜳶𜳷𜳸𜳹𜳺𜳻𜳼𜷦𜷧𜷨𜷩𜷪𜷫𜷬𜷭𜷮𜷯𜷰𜷱𜷲𜷳𜷴𜷵𜷶𜷷𜷸𜷹𜷺𜷻𜷼𜷽𜷾𜷿𜸀𜸁𜸂𜸃𜸄𜸅𜸆𜸇𜸈𜸋𜸌𜸍𜸎𜸏𜸐𜸑𜸒𜸓𜸔𜸕𜸖𜸗𜸘𜸙𜺰𜺱𜺲"]
];
let currentGroup = 0;
function showGroup(id) {
  let c = characters[id][1].split(/(?:)/u);
  let l = document.getElementById("chars");
  while (l.hasChildNodes()) {
    l.removeChild(l.firstChild);
  }
  for (let i in c) {
    let btn = document.createElement("button");
    btn.addEventListener("click", ()=>{writeChar(c[i], 1)});
    btn.innerHTML = c[i];
    document.getElementById("chars").appendChild(btn)
  };
  document.getElementById("groupName").innerHTML = characters[id][0]
};
function fmod(a, b) { return ((a % b) + b) % b };
document.getElementById("prevGroup").addEventListener("click", ()=>{
  currentGroup = fmod(currentGroup - 1, characters.length);
  showGroup(currentGroup);
});
document.getElementById("nextGroup").addEventListener("click", ()=>{
  currentGroup = fmod(currentGroup + 1, characters.length);
  showGroup(currentGroup);
});
showGroup(currentGroup);
