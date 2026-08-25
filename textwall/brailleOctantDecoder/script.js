const charset = `  !𜴔"𜴳#𜴱$𜶆%𜴯&𜴮'𜴉(𜶄)𜵙*𜴐+𜶌,𜴀-𜴧.𜴣/𜶽0𜵾1𜵱2𜵵3𜵳4𜵻5𜵹6𜵷7𜵿8𜵽9𜵶:𜴆;🯦<▚=𜶨>𜶊?𜴫@𜴷A𜴶B𜴺C𜴸D𜵀E𜴾F𜴼G𜵄H𜵂I𜴻J𜵃K𜵅L▌M𜵇N𜵍O𜵌P𜵊Q▛R𜵏S𜵉T𜵐U𜵢V𜵦W𜵟X𜵤Y𜵬Z𜵪[𜷞\\𜷌]𜷡^𜷏_▄\`𜺫a𜺨b▘c🮂d𜴅e𜴄f𜴂g▀h𜴇i𜴁j𜴈k𜴊l𜴍m𜴌n𜴓o𜴑p𜴏q𜴗r𜴕s𜴎t𜴖u𜴨v𜴬w𜴥x𜴪y𜴲z𜴰{𜶿|▐}𜷓~𜷃¢𜶮£𜶅¥𜶧§𜷁©𜷎«𜶻®𜶍°𜵲µ𜶃¶𜷂»𜷋×𜶠÷𜶙‘▗’▖“𜵥”𜵩†▜‡𜶫€𜶴™𜶎K𜵅−𜶜∞𜶡`.split(/(?:)/u);
const charsAllowed = [];
const charsAllowedBrailleOctant = [];
for (let i in charset) {
	if (i % 2 == 0) {
		charsAllowed.push(charset[i])
	} else {
		charsAllowedBrailleOctant.push(charset[i])
	}
}
function textToBrailleOctant(text) {
	return text.split(/(?:)/u).map(a => {
		if (charsAllowed.includes(a)) {
			return charset[charset.indexOf(a) + 1];
		};
		return a;
	}).join("")
}
function brailleOctantToText(brailleOctantText) {
	return brailleOctantText.split(/(?:)/u).map(a => {
		if (charsAllowedBrailleOctant.includes(a)) {
			return charset[charset.lastIndexOf(a) - 1];
		};
		return a;
	}).join("")
}