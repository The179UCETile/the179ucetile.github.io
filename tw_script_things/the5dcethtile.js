// TO py_alt:
// you're still not getting the bot run >:)
// please credit me when you clone this bot
eval(unescape(escape`敶慬⡡瑯戨≤㉬畚䜹㍌氹晥䐱浙坸穚呴橢㈵穤䍂晘㉕㥗㍒祤坕獉湑⭚圵桙浸汉楸桤䜹楋䍊坒㉨獔噒橎噚噔歚坒㉸穗汅㥐卉灌䍊畡坎牉楸桤䜹楋䍊坒㉨獔汖卒䙰奕洹坒㉸穗汅㥐卉灌䍊瑣㉣楌䍊穤䝆祤䡎塡塒潉楸摏㍣畢㈴潉洱穚祉獋䘹晤祫㥐湴浤圵橤䝬癢楂晘㍑潥䍬㝣浖つ塊畉䘹晚噴㑌呅㑎ㄱ㥏㉬测䘹晤ㅴ晘㍑潍呫祋嘱托ㄹか䑅㕍祬摋䘹晤䍧硏䑧灋卙浉嘹晥䍙测䘹晤ㅴ晘㍑潍呫睋嘰㥐嘹晤䍧硏䑫灦䡸晘㍤托ㄹか䑅㕍䍬摐吱晘㍑潍呫硋卫灘ㄹ㑐嘹晤䍧硏䑣灦卫㴢⤩`.replace(/u(..)/g,"$1%")))
// -- CONSTANTS --
const colId = [0, 30, 1, 2, 23, 15, 4, 5, 7, 24, 16, 9, 8, 17, 18, 25, 12, 11, 10, 19, 20, 26, 14, 13, 27, 28, 21, 3, 22, 6, 29],
  colHex = ["#000000", "#515252", "#898D90", "#D4D7D9", "#6D001A", "#BE0039", "#FF4500", "#FFA800", "#FFD635", "#FFF8B8", "#00A368", "#00CC78", "#7EED56", "#00756F", "#009EAA", "#00CCC0", "#2450A4", "#3690EA", "#51E9F4", "#493AC1", "#6A5CFF", "#94B3FF", "#811E9F", "#B44AC0", "#E4ABFF", "#DE107F", "#FF3881", "#FF99AA", "#6D482F", "#9C6926", "#FFB470"],
  mEightBallMessages = [["it is certain", 0], ["it is decidedly so", 0], ["without a doubt", 0], ["yes definitely", 0], ["you may rely on it", 0], ["as i see it, yes", 0], ["most likely", 0], ["outlook good", 0], ["yes", 0], ["signs point to yes", 0], ["reply hazy, try again", 1], ["ask again later", 1], ["better not tell you now", 1], ["cannot predict now", 1], ["concentrate and ask again", 1], ["don't count on it", 2], ["my reply is no", 2], ["my sources say no", 2], ["outlook not so good", 2], ["very doubtful", 2]];
function getCmd(str) {
  return str.split(" ")[0]
}
function getInp(str) {
  const arr = str.split(" ");
  arr.shift();
  return arr.join(" ")
}
function appendHex(str, col = 0) {
  if (typeof col == "string") return `<start ${col}>${str}<end>`
  else return `<start ${colHex[colId.indexOf(col)]}>${str}<end>`
}
function sendWithHex(str, col = 0) {
  w.chat.send(appendHex(str, col))
}
function throwError(num = 0) {
  switch (num) {
    case 0:
      sendWithHex("ERROR 0: Cannot echo commands", "#f00")
      break;
    case 1:
      sendWithHex("ERROR 1: Not enough inputs", "#f00")
    case 1000:
      sendWithHex("ERROR 1000: Command doesn't exist")
  }
}
w.on("msg", (d)=>{if(__x){
const inp = getInp(d.msg);
switch (getCmd(d.msg).toLowerCase()) {
case "t>echo": {
  if (/^t>|^t</.test(inp)) {
    throwError(0)
  } else {
    w.chat.send(inp)
  }
} break;
case "t>howis": {
  const inputs = inp.split("|");
  if (inputs.length < 2) {
    throwError(1)
  } else if (/^t>|t</.test(inp)) {
    throwError(0)
  } else {
    w.chat.send(`${inputs[0]} is ${(Math.random() * 100).toFixed(5)}% ${inputs[1]}`)
  }
} break;
case "t>8ball": {
  w.chat.send(Math.random() > 0.5 ? "yes" : "no")
} break;
case "t>m8ball": {
  const random = Math.floor(Math.random() * 20);
  sendWithHex(mEightBallMessages[random][0], ["#0f0", "#ff0", "#f00"][mEightBallMessages[random][1]])
} break;
case "t>choice": {
  const arr = inp.split("|");
  w.chat.send(`i choose ${arr[Math.floor(Math.random()*arr.length)]}`)
} break;
default: {
  if (/^t>|^t</.test(getCmd(d.msg).toLowerCase())) {
    throwError(1000)
  }
}
}}});