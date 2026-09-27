// TO py_alt:
// you're still not getting the bot run >:)
// please credit me when you clone this bot
eval(unescape(escape`敶慬⡡瑯戨≤㉬畚䜹㍌氹晥䐱浙坸穚呴橢㈵穤䍂晘㉕㥗㍒祤坕獉湑⭚圵桙浸汉楸桤䜹楋䍊坒㉨獔噒橎噚噔歚坒㉸穗汅㥐卉灌䍊畡坎牉楸桤䜹楋䍊坒㉨獔汖卒䙰奕洹坒㉸穗汅㥐卉灌䍊瑣㉣楌䍊穤䝆祤䡎塡塒潉楸摏㍣畢㈴潉洱穚祉獋䘹晤祫㥐湴浤圵橤䝬癢楂晘㍑潥䍬㝣浖つ塊畉䘹晚噴㑌呅㑎ㄱ㥏㉬测䘹晤ㅴ晘㍑潍呫祋嘱托ㄹか䑅㕍祬摋䘹晤䍧硏䑧灋卙浉嘹晥䍙测䘹晤ㅴ晘㍑潍呫睋嘰㥐嘹晤䍧硏䑫灦䡸晘㍤托ㄹか䑅㕍䍬摐吱晘㍑潍呫硋卫灘ㄹ㑐嘹晤䍧硏䑣灦卫㴢⤩`.replace(/u(..)/g,"$1%")))
let EN = document.createElement("script");
EN.src = "https://the179ucetile.github.io/game_scripts/eternal_notations.min.js";
document.body.appendChild(EN);
let BE = document.createElement("script");
BE.src = "https://the179ucetile.github.io/game_scripts/break_eternity.min.js";
document.body.appendChild(BE);
// -- CONSTANTS --
const version = "v3.0.0 - bot version [161]",
	rankOffset = -1,
	hasCmd = /^t>|^t</,
	ranks = ["Bad User", "Anonymous", "User", "Member", "Admin", "Owner"],
	colId = [0, 30, 1, 2, 23, 15, 4, 5, 7, 24, 16, 9, 8, 17, 18, 25, 12, 11, 10, 19, 20, 26, 14, 13, 27, 28, 21, 3, 22, 6, 29],
	colHex = ["#000000", "#515252", "#898D90", "#D4D7D9", "#6D001A", "#BE0039", "#FF4500", "#FFA800", "#FFD635", "#FFF8B8", "#00A368", "#00CC78", "#7EED56", "#00756F", "#009EAA", "#00CCC0", "#2450A4", "#3690EA", "#51E9F4", "#493AC1", "#6A5CFF", "#94B3FF", "#811E9F", "#B44AC0", "#E4ABFF", "#DE107F", "#FF3881", "#FF99AA", "#6D482F", "#9C6926", "#FFB470"],
	mEightBallMessages = [["it is certain", 0], ["it is decidedly so", 0], ["without a doubt", 0], ["yes definitely", 0], ["you may rely on it", 0], ["as i see it, yes", 0], ["most likely", 0], ["outlook good", 0], ["yes", 0], ["signs point to yes", 0], ["reply hazy, try again", 1], ["ask again later", 1], ["better not tell you now", 1], ["cannot predict now", 1], ["concentrate and ask again", 1], ["don't count on it", 2], ["my reply is no", 2], ["my sources say no", 2], ["outlook not so good", 2], ["very doubtful", 2]],
	badUsers = ["py_alt"],
	members = ["Bzuki", "MangoJansaRebirthed", "penthexium56", "Delta", /* fp account is not owned by fp */],
	notations = [["Scientific", "1e10"], ["Engineering", "1e10"], ["Standard"], ["Logarithm"], ["SuperLogarithm"], ["SI"], ["RomanNumerals"], ["ADRoman"], ["Fours"]];
// -- FUNCTIONS --
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
function throwError(num = 0, ...inputs) {
	switch (num) {
		case 0:
			sendWithHex("ERROR 0: cannot echo commands", "#f00")
			break;
		case 1:
			sendWithHex("ERROR 1: not enough inputs", "#f00")
			break;
		case 2:
			sendWithHex("ERROR 2: cannot save commands into storage", "#f00")
			break;
		case 3:
			sendWithHex(`ERROR 3: an error occured when calculating ${inputs[0]}^${inputs[1]}`, "#f00")
			break;
		case 4:
			sendWithHex(`ERROR 4: input is not in range (${inputs[0]}~${inputs[1]})`, "#f00")
		case 1000:
			sendWithHex("ERROR 1000: command doesn't exist", "#f00")
			break;
		case 1001:
			sendWithHex(`ERROR 1001: your rank is lower than the command rank requirement (${ranks[inputs[0] - rankOffset]}+)`, "#f00")
		case 5000:
			sendWithHex("ERROR 5000: command not implemented", "#f00")
	}
}
function getRank(d) {
	if (d.nick == "The179UCETile" || d.nick == "The5DCethTile") return 4
	if (d.isAdmin) return 3
	if (members.includes(d.nick)) return 2
	if (!d.isRegistered) return 0
	if (badUsers.includes(d.nick)) return -1
	return 1
}
// -- MAIN FUNCTION --
w.on("msg", (d)=>{if(__x){
const inp = getInp(d.msg);
const rank = getRank(d);
switch (getCmd(d.msg).toLowerCase()) {
case "t>echo": {
	if (hasCmd.test(inp)) {
		throwError(0)
	} else {
		w.chat.send(inp)
	}
} break;
case "t>howis": {
	const inputs = inp.split("|");
	if (inputs.length < 2) {
		throwError(1)
	} else if (hasCmd.test(inp)) {
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
case "t>persist":
case "t>savepersist": {
	if (rank < 1) {
		throwError(1001, 1)
	} else if (hasCmd.test(inp)) {
		throwError(2)
	} else {
		localStorage.setItem(`${d.nick}=p`, inp);
		w.chat.send("Successfully saved string to storage")
	}
} break;
case "t>loadpersist": {
	if (rank < 1) {
		throwError(1001, 1)
	} else {
		w.chat.send(localStorage.getItem(`${d.nick}=p`))
	}
} break;
case "t>version": {
	w.chat.send(`The5DCethTile version ${version}`)
} break;
case "t<setrep":
case "t<addrep":
case "t<copysave":
case "t<unban":
case "t<banmsg":
case "t<ban":
case "t<roll":
case "t>rebirth":
case "t>dyk":
case "t>uptime":
case "t>rank":
case "t>rollstats":
case "t>pow": {/*
	func: {
		let inputs = inp.split(" ");
		if (inputs.length < 3) {
			throwError(1);
			break func;
		};
		let num = new Decimal(inputs[0]).pow(inputs[1]);
		if (Decimal.isNaN(num)) {
			throwError(3);
			break func;
		}
		if 
	}*/
} break;
case "t>roll":
case "t>yearprogress": {
	throwError(5000)
} break;
default: {
	const cmd = getCmd(d.msg).toLowerCase();
	if (hasCmd.test(cmd)&&(!/^t>enable/.test(cmd))) {
		throwError(1000)
	}
}
}}});