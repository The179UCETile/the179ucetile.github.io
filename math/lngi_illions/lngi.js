let t = 0;
function commasplitThing(num, base, lim, forceInteg = false) {
	num = new Decimal(num);
	base = new Decimal(base);
	const arr = [];
	let num2 = num;
	if (num.lt("0")) return [[new Decimal(0), new Decimal(0)]];
	if (num.gte("e9e15")) lim = 1; // precision loss
	while (arr.length < lim && num2.gt("0")) {
		let log = num2.log(base).floor(), man = num2.div(base.pow(log)).floor();
		if (man.eq("0")) man = new Decimal("1");
		if (man.gte(base)) {
			log = log.add(man.log(base)).floor();
			man = man.div(base.pow(man.log(base).floor())).floor();
		};
		arr.push([man, log]);
		num2 = num2.sub(man.mul(base.pow(log)));
		if (forceInteg) num2 = num2.floor();
	};
	return arr;
}
function tierer(num, cur, next, sep, base = "1e3", doNotUseBlankForOne = false, max = 6, ending = "") {
	if (num.lt(base)) return cur(num);
	const arr = commasplitThing(num, base, max);
	const s = [];
	let ii = 0;
	for (let i of arr) {
		let pref = cur(i[0]);
		if (ending != "" && i[1].neq(0)) pref = pref.replace(/.$/, ending);
		if (i[1].eq("0")) {
			s.push(pref);
		} else {
			s.push(`${i[0].gt("1") || (doNotUseBlankForOne && ii != 0) ? pref + (i[1].gte("10") ? "<br>" : "") : ""}${next(i[1])}`);
		};
		ii++;
	};
	return s.join(sep);
}
function tierer2(num, cur, next, sep, base = "1e3", doNotUseBlankForOne = false, max = 6) { // for tier 2
	if (num.lt(base)) return cur(num);
	const arr = commasplitThing(num, base, max);
	const s = [];
	let ii = 0;
	for (let i of arr) {
		if (i[1].eq("0")) {
			s.push(cur(i[0], 2));
		} else {
			s.push(`${i[0].gt("1") || (doNotUseBlankForOne && ii != 0) ? cur(i[0], 1) + (i[1].gte("10") ? "<br>" : "") : ""}${next(i[1])}`);
		};
		ii++;
	};
	return s.join(sep);
}
function tierer3(num, cur, next, sep, base = "1e3", doNotUseBlankForOne = false, max = 6, ending = "") { // for tier 4
	if (num.lt(base)) return cur(num);
	const arr = commasplitThing(num, base, max);
	const s = [];
	let ii = 0;
	for (let i of arr) {
		let pref = cur(i[0]);
		if (ending != "" && i[1].neq(0)) pref = pref.replace(/.$/, ending);
		if (i[1].eq("0")) {
			s.push(pref);
		} else {
			let pref2 = i[0].gt("1") || (doNotUseBlankForOne && ii != 0) ? cur(i[0], i[0].gte("2")) : "";
			pref2 ??= "";
			if (i[0].gte("2")) pref2 = pref2.replace(/[aeiou]$/, "");
			let prefNext = next(i[1]);
			if (i[0].gte("2")) {
				prefNext = prefNext.replace(/^[bcdfghjklmnpqrstvwxyz]+/, "");
				if (/^et/.test(prefNext)) {
					prefNext = `e${prefNext}`
				}
				if (/^y/.test(prefNext)) {
					prefNext = `o${prefNext}`
				}
			}
			s.push(`${pref2 + (i[0].gt("1") && i[1].gte("10") ? "<br>" : "")}${prefNext}i`);
		};
		ii++;
	};
	return s.join(sep);
}
function tierer4(num, cur, next, sep, base = "1e3", doNotUseBlankForOne = false, max = 6, ending = "") { // for tier 5
	if (num.lt(base)) return cur(num);
	const arr = commasplitThing(num, base, max);
	const s = [];
	let ii = 0;
	for (let i of arr) {
		let pref = cur(i[0], ii != 0);
		if (ending != "" && i[1].neq(0)) pref = pref.replace(/.$/, ending);
		if (i[1].eq("0")) {
			s.push(pref);
		} else {
			s.push(`${i[0].gt("1") || (doNotUseBlankForOne && ii != 0) ? pref + (i[1].gte("10") ? "<br>" : "") : ""}${next(i[1])}`);
		};
		ii++;
	};
	return s.join(sep);
}
function removeTrailingZeros(str) {
	if (!/\./.test(str)) return str;
	return str.replace(/0+$/, "").replace(/\.$/, "");
}
function truncateString(str, len, left = false) {
	const s = str.split(/(?:)/u);
	return s.length > len ? left ? `...${s.slice(s.length - len + 3, s.length).join("")}` : `${s.slice(0, len - 3).join("")}...` : str
}
function illionName(illion, c = false) {
	const r = [
		"thousand m b tr quadr quint sext sept oct non",
		" un duo tre quattuor quin sex septen octo novem",
		" deci viginti triginta quadraginta quinquaginta sexaginta septuaginta octoginta nonaginta",
		" centi ducenti trecenti quadringenti quingenti sescenti septingenti octingenti nonaginti",

		" milli micro nano pico femto atto zepto yocto ronto quecto meco dueco treco tetreco penteco hexeco hepteco octeco enneco",
		" me due trio tetre pente hexe hepte octe enne",
		" ce icose triaconte tetraconte pentaconte hexaconte heptaconte octaconte ennaconte",
		" hect dohect triahect tetrahect pentahect hexahect heptahect octahect ennahect",

		" killa mega giga tera peta exa zetta yotta ronna quetta henda doka tradaka tedaka pedaka exdaka zadaka yodaka nedaka",
		"a ena oda tra tera peta eca zeta yota rona",
		" da i tra te pe exa za yo no",
		" ho bo tro to po exo zo yo no",

		" kal mej gij ast lun ferm jov sol bet gloc gax sup vers mult pyr gunt kentr onl paptr",
		" kal mej gij ast lun ferm jov sol bet", // UNUSED
		" gloc hous trong bat handr mast got kort nenk",
		" jan mejan gijan astan lunan ferman joven solan betan",

		" febru maru apru mayu junu julu augu septembu octobu",
		" novembu icosembu febicosembu maricosembu apricosembu mayicosembu junicosembu julicosembu augicosembu",
		" hectembu bectembu febectembu marectembu aprectembu mayectembu junectembu julectembu augectembu",

		" itale gothe beethe ugare perse desere shave osmane pheone",
		" kharoshe ugaricuenife persicuenife desericuenife shavicuenife osmanicuenife cyprnicuenife pheonicuenife kharoshicuenife",
		" ceneife ugariceneife persiceneife desericeneife shaviceneife osmaniceneife cyprniceneife pheoniceneife kharoshiceneife",

		" red ᶀ Œ G Ƴ Ł Ɠ ꜳ Ꞗ", " ɨ Ṃ Ᵽ Ɓ W ꝿ ſ Ƃ ħ", " ɯ ƃ œ Ǥ ƴ Ɩ Ɡ Ꜷ ꞗ",
		" Ə ꜵ ב Ꞵ c ɕ ɗ ᴆ ɘ", " ə ɚ Ǝ ɜ ɝ ɞ ⱸ ꬲ ꬳ", " ꞡ ʮ ʚ ʙ Ↄ ↄ ꝱ Ɑ Ɛ",
		" ᴉ ɻ ꞣ ꝇ Ꝉ ᶇ ᴓ ꟊ Ꟍ", " ꞇ Ꞇ ᶑ ꟗ ʌ Ꝕ ᵺ ᵱ ḃ", " Ꟙ 𝼉 Ḃ ꟿ ꝃ ꟷ Ꟈ ꟁ Ꞔ",
		" ᶬ W ꞔ Ꝁ ꝸ Ꟑ Ｍ ʯ ꞕ", " ꝛ Ꝛ Ꜩ ʧ ꝕ Ⱶ ⱶ ⱺ Ꝫ", " ꭃ Ꝺ þ ꝙ Ꝙ Ꝣ ꝣ Ꞝ Ꟗ",
		" Ꝃ ｍ ꟑ ꝷ ƿ ɇ Ƹ Ɏ Ʀ", " ꝯ ꟾ 𝼓 𝼪 ꟕ ꬴ Ᶎ ɣ ꞑ", " ꜧ ꞵ ʨ Ʇ ꝥ 𝼘 ƹ Ȝ ȵ",
		" ᴷ ᴿ ᴶ ᵀ ꟲ ⱽ ᶻ ᴬ ᴺ", " ᴰ ʳ ʲ ᵗ ᶜ ᵛ 𐞚 ᵃ ⁿ", " ᶝ 𐞨 𐞘 𐞯 ˤ ᶹ 𐞞 𐞃 ᶮ",
		" ẅ ṽ u ṯ ṧ Ṝ Ǭ ṕ ṓ", " Ṿ ḕ ṻ Ṯ Ṧ ṝ ǭ Ṕ Ṓ", " ẖ ṿ Ṹ ṭ ṥ Ṟ Ƣ ṗ ṏ",
		" Ɯ ᶌ ư ȶ Ʃ Ɍ ƣ ᵽ Ɵ", " Ʋ ơ Ʉ Ⱦ Ꞩ ɍ ǫ Ƿ Ơ", " ɦ Ʌ Ʊ Ŧ ʪ ʀ ȹ Ꝓ ɷ",
		" Ɲ ɱ ɫ ƙ ʝ ɩ ʎ ƍ ƒ", " ɤ ɐ ȴ ʞ ʄ ı ʜ ǥ Ⅎ", " Ꜧ ᴟ ʟ Ꝅ ⱹ ǂ ʱ ꬶ ʇ",
		" Ƞ Ⅿ ł Ⱪ ⱼ Ɨ ᴴ ᶃ ꜰ", " ⱴ Ꜵ ʫ 𝼃 𝼈 ɪ ʰ ʛ ⅎ", " ᶣ ᴹ Ƚ ⱪ 𝼋 ʅ ₕ 𝼁 ꞙ",
		" Ɇ Ɗ ƈ ɓ ᶏ Ƶ Ɣ X w", " ⱱ ᴐ ʗ Ꝧ ⱥ ƺ ɏ ᶍ ʬ", " ꟸ Đ Ɔ ꝧ Ꜹ ᴣ Ꟛ Ꭓ ꝡ",
		" ꭡ Ƌ Ƈ ꟓ ꜻ ʑ Ɤ ꭓ Ꝡ", " ꝟ ᶖ Ȼ 𝼅 Ꜳ ɀ ỿ ꭗ Ⱳ", " 𐞕 ƌ ȼ ꟔ ꜹ ʐ ꝩ ꭖ ꞷ",
		" ꜷ ₘ ȸ ʋ ᶗ ↅ 𝼂 Ỽ ꞩ", " ↆ Ա ↁ Ⅴ 𝼏 𝼝 Ꞡ ꟒ Ꟊ", " 𐞖 ꭩ ꟈ Ꝟ Ç ç ᶢ ỽ ꟍ",
		" Ｈ Ǆ ｈ ŧ ⱷ ᵇ ᵐ ϻ ꝓ", " ƚ ᴑ 𝼆 ꞁ 𝼛 Ｂ Ѧ ѩ ᴾ", " Ḣ ǲ ḥ Ꞁ ᵖ ｂ ѧ Ѩ ₚ",
		" Ʂ ꝅ Ꝍ ꞥ Ѭ ꓨ ꭤ 𝼌 ꞹ", " 𐞄 ᶒ ꝋ ꝴ ѫ Ϭ Ⅽ ꭍ Ꞟ", " 𐞗 Ʞ ꝏ Ꞥ ѭ ϭ Ϛ ꟙ ꭎ",
		" א בּ ג ד ה ו ז ח ט", " Ｇ ｐ גּ דּ הּ וּ זּ 𐡇 טּ", " ң 𐤁 𐤂 𐤃 𐤄 𐤅 𐤆 𐤇 𐤈",
		" י כ ל מ נ ס ע פ צ", " Ꝇ 𝼩 לּ מּ נּ סּ 𐡏 פּ צּ", " ђ 𐤊 𐤋 𐤌 𐤍 𐤎 𐤏 𐤐 𐤑",
		" ק ר ש ת α β γ δ ε", " Ҥ ﬆ שּ תּ ꓯ ꓭ Γ Δ ꝫ", " Ϧ 𐤓 𐤔 𐤕 ⲁ ⲃ ⲅ ⲇ ⲉ",
		" ζ η θ ι κ λ μ ν ξ", " Ϸ 𝼊 ꭧ 𝼚 Қ 𝼍 Ѫ 𝼇 Ξ", " ͱ ⲏ ⲑ ⲓ ⲕ ⲗ ⲙ ⲛ ⲝ",
		" ϙ π ρ σ τ υ φ χ ψ", " ω ͳ ꓤ Ɜ ꭏ ꓵ Φ ꭔ Ψ", " Ћ ⲡ ⲣ ⲥ ⲧ ⲩ ⲫ ⲭ ⲯ",
		" Ӎ Ꟃ ⱻ ӎ ᶘ ȿ ʉ ʭ ϼ", " К ƶ ᶓ Щ 𝼕 𝼞 ᵫ ꬻ Ҏ", " Ђ ꟃ ꭢ щ 𝼎 Ϩ ϥ Л ҏ",
		" 𝐙 𝐘 𝐗 𝐖 𝐕 𝐔 𝐓 𝐒 𝐑", " 𝐳 𝐲 𝐱 𝐰 𝐯 𝐮 𝐭 𝐬 𝐫", " 𝕫 𝕪 𝕩 𝕨 𝕧 𝕦 𝕥 𝕤 𝕣",
		" 𝐐 𝐏 𝐎 𝐍 𝐌 𝐋 𝐊 𝐉 𝐈", " 𝐪 𝐩 𝐨 𝐧 𝐦 𝐥 𝐤 𝐣 𝐢", " 𝕢 𝕡 𝕠 𝕟 𝕞 𝕝 𝕜 𝕛 𝕚",
		" 𝐇 𝐆 𝐅 𝐄 𝐃 𝐂 𝐁 𝐀 𝑃", " 𝐡 𝐠 𝐟 𝐞 𝐝 𝐜 𝐛 𝐚 𝑝", " 𝕙 𝕘 𝕗 𝕖 𝕕 𝕔 𝕓 𝕒 𝔭",
		" ш Ч Π ℙ Ꝼ Ꜻ Ꝝ У 𝼖", " ꞯ ᵻ Ͳ Ϯ ϸ ϧ Њ Ѻ З", " Ԋ ԃ ϯ 𝼗 Ԗ Ӈ ҥ ѻ є",
		" к Ш ᴳ 𝼜 ꓒ ᶔ ᶚ ꟛ ꝵ", " ꜩ ί ţ Ｔ ԗ ϵ Ⱬ ꭚ Ꞃ", " ꭜ Ѣ ｔ ᶵ Ｐ ϶ ⱬ Ƛ ꝶ",
		" Ќ ѡ п Ṗ Ꞙ Å Ҭ ү ӷ", " ʠ ᵼ ҭ Ҵ ф Ҕ Ң Ꟁ Є", " ћ ȡ Ԏ ԏ 𝑷 ԋ Ӊ Ҩ ҙ",
		" ќ ϡ Ϥ 𐞝 𝒑 Ѥ Ɀ ϒ г", " ᶐ İ ҵ ₜ ℘ ѥ ꝝ ϔ Ǌ", " ӈ ѣ 𐞫 𐞮 ℗ ℇ ᶎ ℽ ℿ",
		" ӄ Ѡ ϑ 𐞬 𝒫 Ԑ ʒ ʏ ʁ", " ℚ ΐ 𐞭 ṱ 𝓅 Э ʓ ұ 𝼔", " Ԩ б ẗ Ṱ 𝓹 ԑ ʡ ϓ ᴎ",
		" Ҝ ж Ԍ Ṭ 𝔓 ᴔ ƾ Ӌ ꞃ", " Ҷ ϊ ꞅ Ꞅ 𝕻 Ә ᵶ Ҹ Љ", " Ԧ ъ Ṫ ṭ 𝖕 ℈ ʕ Ұ Ԉ",
		" Ҟ ↀ л ᴅ ᴝ Ҙ ꝼ ϩ Б", " Ҁ Д ԩ ꝁ 𝖯 𝗉 ẜ ꬼ ʖ", " 𝛼 𝛽 𝛾 𝛿 𝜃 𝜄 𝜅 𝜆 𝜎",
		" ϛ ẝ ԧ Ѹ ｇ ѝ д Ғ ẛ", " Ԣ ғ Ꜽ Ꝏ Ʝ ҷ Ԫ 𝗣 ỻ", " Þ ԣ Ѵ ᶋ Ț ⅉ ꬿ ꭄ ẞ",
		" 𐞠 ꭦ ț Ť 𝗽 ҕ 𐞡 ꝍ э", " ʣ ℹ ť ℡ 𝘗 ӊ Һ ѳ Ӛ", " һ ᶁ ™ 𝑇 𝘱 ĥ Ĥ ᴒ Ѯ",
		" Ҫ ӂ Ϙ ℸ 𝙋 Ҽ ϟ ц Я", " ℺ ⅈ 𝑡 𝑻 𝙥 ҿ Ϟ ч И", " Ԡ Ҍ 𝒕 𝒯 𝙿 ҽ ᶼ Ӳ 𝼧",
		" Ӄ ӝ ᵍ Ⱥ ɬ ʩ ᶨ ˢ Ъ", " 𐞒 ȟ 𝓉 Ы Ȟ Ӝ 𐞓 Ϗ ͷ", " 𝚥 Ӂ 𐞔 ꬰ ᶅ ﬀ 𐞦 ᶳ ы",
		" Ԟ Ж Ĝ ª ƛ ℻ 𐞧 ᶴ љ", " Ģ Ḥ 𝓣 ь Ҧ ᶭ ℊ Ҡ Ӆ", " ĵ ꟺ ğ ꜽ Ⱡ ﬁ Ĵ š ß",
		" қ ℳ ⅁ 𝓽 𝚙 ϱ ź ꭅ ꭆ", " Ｑ ⁱ 𝔗 𝔱 𝛒 ȝ ℤ ҹ Ҋ", " њ ϐ 𝕋 𝕿 𝜌 ᶕ Ｚ ӌ Й",
		" ҝ Җ ҁ ꬱ ꬹ ﬂ ǰ ﬅ ℬ", " 𝐺 ℏ 𝖙 𝼻 𝼲 𝽊 𝼰 𝼐 𝽍", " 𝽰 𝽌 𝽅 𝽀 ɭ 𝼀 𝽐 𝾕 𐞅",
		" 𝽈 𝽋 ġ 𝼢 𝝆 𝽃 𝽦 𝼱 𝾔", " ꟴ 𝽝 𝼣 𝼤 𝞀 𝽄 ƻ 𝼹 𝽎", " 𝽆 Ḅ 𝼬 𝼯 𝞺 𝽜 ℥ 𝽕 𝽏",
		" 𝽉 𝑀 Ǧ ꭁ ɮ ﬃ ꓩ 𝾖 ḇ", " Ġ ℎ 𝼸 ḅ ℍ 𝑚 ģ ҡ №", " 𐞼 𝑴 ǵ 𝽚 ⱡ Ϝ 𝽗 𝚦 Ḇ",
		" ʊ 𝐵 𝽣 𝼴 𝑄 𝽢 ꟱ ↂ ӆ", " ʤ 𝽑 𝖳 𝑞 𝑸 ś Ş Ɒ ϰ", " ς ꝺ 𝗍 𝒒 𝒬 ŝ Š ↈ Ͷ",
		" ԟ 𝓂 ǧ 𝗧 Ф 𝽨 ꭬ 𝼾 𝑏", " Ğ ꭂ 𝽛 𐞾 Ԅ ⅍ ԇ Ԥ ѯ", " ℰ ϗ ͼ ꭕ ℼ 𝜏 џ 𝜑 𝜒",
		" 𝜓 𝓜 ǋ Ԇ Ӻ ҩ Ȥ Ӵ ꭙ", " ɰ ꟳ 𝘁 𐞥 𝓆 ѵ ȥ Ｙ ꭇ", " ҟ ʥ 𝘛 𝓠 𝓺 ѷ ⅀ ｙ ꭉ",
		" ԅ Ѿ Ѝ ᴖ ﬄ 𝽁 Ź Ŷ Ŗ", " ǁ ǅ 𐞻 ᴗ ӻ ℨ ℶ ỵ Ԓ", " Ϡ ϖ Ͱ ᴕ ḟ 𝑩 𝒃 ӵ 𝐻",
		" ԥ ʴ 𝽩 ℉ 𐞺 𐞽 Ṩ 𐞹 𐞀", " Ѓ ѓ Ӷ Ґ ґ Ｓ ｓ 𝽬 ή", " Ω 𝘵 𝙏 𝐹 𝑓 ṧ Ṥ ӛ Ӥ",
		" 𝟏 𝟐 𝟑 𝟒 𝟓 𝟔 𝟕 𝟖 𝟗", " 𝟙 𝟚 𝟛 𝟜 𝟝 𝟞 𝟟 𝟠 𝟡", " 𝟣 𝟤 𝟥 𝟦 𝟧 𝟨 𝟩 𝟪 𝟫",
		" 𝟭 𝟮 𝟯 𝟰 𝟱 𝟲 𝟳 𝟴 𝟵", " 𝟷 𝟸 𝟹 𝟺 𝟻 𝟼 𝟽 𝟾 𝟿", " 𝜕 𝜖 𝜗 𝜘 𝜙 𝜚 𝜛 𝝏 𝝐",
		" 𝚷 𝚫 𝛕 𝛁 𝛗 𝙷 𝚑 𝛔 𝛆", " 𝛅 𝛊 𝝉 𝚪 𝛟 𝛈 𝜂 𝛉 𝛜", " 𝜼 𝛥 𝜞 𝝘 𝚽 𝝶 𝞰 𝝔 𝛏",
		" ҫ Ԃ Ᲊ ᲊ ᴥ 𝽸 𝽤 𝽘 𝽭", " ᲈ 𝽱 𞀳 𞁧 ⅊ Ή 𝑯 ѹ 𝽂", " ℋ 𝼒 ᲆ Ꙥ ⅌ ԡ ℌ 𝼼 𝾁"
	].map(a => a.split(/ /u));
	const specials = [
		" al ej ij ast un erm ov ol eet oc ax up ers ult opyr unt entr eonl aptr",
		"	ous ong at andr omast ogot ort enk",
		" an ejan ijan astan unan erman ovan olan etan",
		" unt duot tret quadr quint sext sept oct non"
	].map(a => a.split(/ /u));
	const supertier2 = [
		" 𝽺 𝼟 Ꙧ ꙥ ⅋ Ḩ ḧ ℴ ⅇ", " ↇ Ⅰ ℾ ᲄ ϕ Ḫ Ḧ Ȣ ᲀ", " ḩ ᵭ ꙧ Ꙣ Ꙉ 𝽇 ḫ ȣ ȩ", "𝔞 𝔟 𝔠 𝔡 𝔢 𝔣 𝔤 𝔥 𝔦 𝔧 𝔨 𝔩 𝔪 𝔫 𝔬 𝽖 𝔮 𝔯 𝔰 ꙣ 𝔲 𝔳 𝔴 𝔵 𝔶 𝔷",
		" ꞟ 𝼠 𝞃 Ꙟ Ꙋ ḣ 𝒉 𝽓 𞀷", " 𝼡 𝽯 𝙩 𝽮 Ɂ Ц 𝒽 Ю Ͼ", " 𝓗 𝼙 𝞽 𝚃 ʢ Ꙡ ꙡ 𝽲 ę",
		" Ꜥ 𝼥 𝚝 𝞒 ˠ 𝕳 𝖍 𝼳 Ę", " ǆ ȋ ꙟ 𞁔 Ꜣ 𝖧 𝗁 𝽞 Ҿ 𝗛"
	].map(a => a.split(/ /u));
	function rnd(d, m = false, n = illion) {
		return n.div(new Decimal("10").pow(d)).floor().mod(m ? "1e3" : "10").toNumber();
	}
	function prefixify(tierPref, idx) {
		idx = idx.floor();
		if (idx.lte("0")) return "";
		if (idx.eq("1")) return tierPref;
		return `${idx.mod("10").neq("0") ? tierPref + supertier2[0][rnd("0", 0, idx)] : ""}${idx.mod("100").gte("10") ? tierPref + supertier2[1][rnd("1", 0, idx)] : ""}${idx.mod("1000").gte("100") ? tierPref + supertier2[2][rnd("2", 0, idx)] : ""}`
	}
	function getT2ST2(idx) {
			return `${supertier2[7][rnd("0", 0, idx)]}${supertier2[8][idx.div("10").floor().toNumber()]}`
	}
	function getT1ST2(idx) {
		if (idx.lt("1000")) {
			return `${supertier2[4][rnd("0", 0, idx)]}${supertier2[5][rnd("1", 0, idx)]}${supertier2[6][rnd("2", 0, idx)]}`
		} else {
			return tierer(idx, getT1ST2, getT2ST2, "-", "1000", true)
		}
	}
	function getTierPref(idx, tier, special = false) {
		if (idx.gte("1000")) {
			let sep = (tier.mod("2").eq("1") ? "-" : "") + "<br>";
			if (tier.eq("1")) return tierer2(idx, illionName, d => getTierPref(d, new Decimal("2")), sep, "1000", true, 3);
			if (tier.eq("3")) return tierer3(idx, (d, m) => getTierPref(d, tier, m), d => getTierPref(d, tier.add("1").floor()), sep, "1000", true, 3, "i");
			if (tier.eq("4")) return tierer4(idx, (d, m) => getTierPref(d, tier, m), (d, m) => getTierPref(d, tier.add("1").floor(), m), sep, "1000", true, 3, "");
			return tierer(idx, d => getTierPref(d, tier), d => getTierPref(d, tier.add("1").floor()), sep, "1000", true, 3, ["", "o", "e"][tier.floor().toNumber()] ?? "");
		}
		if (tier.gte("56")) {
			let tier2 = tier.sub("56").floor();
			let tier3 = tier2.div("26").add("1").floor();
			let pref = tier3.eq("1") ? "" : getT1ST2(tier3.min("1.7976931348623157e308"));
			return prefixify(tier.eq("109") ? "ℕ" : `${pref}${supertier2[3][tier.gte("9e15") ? 0 : tier2.mod("26").toNumber()]}`, idx)
		}
		switch (tier.toNumber()) {
			case 0: {
				console.error("??????");
				break;
			}
			case 1:
				return illionName(idx);
			case 2:
				if (idx.lt("20")) return r[4][idx.toNumber()];
				return `${idx.mod("100").eq("10") ? "" : `${r[5][rnd("0", 0, idx)]}${r[6][rnd("1", 0, idx)]}`}${r[7][rnd("2", 0, idx)]}o`.replace(/eo$/, "o")
			case 3: {
				if (special && idx.lt("11")) return "  da tra ta pa exa za ya na daka".split(/ /u)[idx.toNumber()]
				if (idx.lt("20")) return r[8][idx.toNumber()];
				let pref = idx.mod("100").lt("20") && idx.mod("100").gte("10") ? r[8][idx.mod("100").toNumber()] : r[9][rnd("0", 0, idx)];
				if (idx.mod("100").gte("20")) {
					if (idx.mod("10").eq("0") || /^[aeiuy]/.test(pref)) {
						pref = `${r[10][rnd("1", 0, idx)]}k${pref}`
					} else {
						pref = `${r[10][rnd("1", 0, idx)]}c${pref}`
					}
				};
				if (idx.gte("100")) {
					pref = `${r[11][rnd("2", 0, idx)]}${/^[aeiou]/.test(pref) ? "t" : ""}${pref}`;
				}
				return pref
			}
			case 4: {
				if (idx.lt("20")) return r[12][idx.toNumber()];
				let pref = (special ? specials[2] : r[15])[rnd("2", 0, idx)];
				pref += (pref != "" ? specials[1] : r[14])[rnd("1", 0, idx)];
				pref += (pref != "" ? specials[0] : r[13])[rnd("0", 0, idx)];
				return `${pref}i`;
			}
			case 5:
				return `${r[18][rnd("2", 0, idx)]}${r[17][rnd("1", 0, idx)]}${r[16][rnd("0", 0, idx)]}`.replace(/[aeiou]$/, "")
			case 8:
				return `${r[27][rnd("2", 0, idx)]}${r[26][rnd("1", 0, idx)]}${r[25][rnd("0", 0, idx)]}`
			default:
				return `${r[19 + (tier - 6) * 3][rnd("0", 0, idx)]}${r[20 + (tier - 6) * 3][rnd("1", 0, idx)]}${r[21 + (tier - 6) * 3][rnd("2", 0, idx)]}`
		}
	}
	let nm = illion.toNumber();
	let part = "";
	if (illion.lt("10")) {
		part = c == 2 ? specials[3][nm] : r[c ? 1 : 0][nm];
	} else if (illion.lt("1e3")) {
		part = illion.eq("103") ? "trescenti" : `${r[1][rnd("0")]}${r[2][rnd("1")]}${r[3][rnd("2")]}`;
	} else if (illion.lt("(e^7)3000.47712125471966244")) {
		part = getTierPref(illion, new Decimal("1"))
	} else if (illion.lt("F9e15")) {
		// for optimization purposes so that we don't get to do 100 getTierPref's
		let tierToUse = illion.slog("1e3").sub("2").floor();
		if (tierToUse.gte("1000")) tierToUse = tierToUse.add("1").floor();
		let tt = illion.iteratedlog("1e3", tierToUse.sub("1"));
		part = getTierPref(tt, tierToUse)
	} else {
		part = `${getTierPref(new Decimal("1"), illion.slog("1e3").add("1").floor())}`
	};
	part ??= "";
	return illion.eq("0") || c ? part : part.replace(/[aeiou]+$/, "") + "illion"
}
function formatIllion(n) {
	n = n.floor();
	if (Decimal.isNaN(n)) return "NaN";
	if (n.eq("-Infinity")) return "negative<br>infinity";
	if (n.eq("Infinity")) return "infinity";
	if (n.eq("0")) return "zero";
	if (n.lt("0")) {
		return `negative<br>${pmn(n.neg(), config)}`
	};
	const arr = commasplitThing(n, "1000", n.gte("1e303") ? 3 : 6);
	let str = "";
	for (let i of arr) {
		str += `${toWord(i[0].floor())}${n.gte("1e303") ? "<br>" : " "}${i[1].eq("0") ? "" : illionName(i[1].sub("1"))}<br>`
	};
	return str;
}
function toWord(n) {
	const r = [
		" one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen",
		" ten twenty thirty forty fifty sixty seventy eighty ninety"
	].map(a => a.split(" "));
	n = n.floor();
	if (n.lt("20")) {
		return r[0][n.toNumber()]
	} else if (n.lt("100")) {
		return `${r[1][n.div("10").floor().toNumber()]}-${r[0][n.mod("10").floor().toNumber()]}`.replace(/-$/g, "")
	} else {
		return `${toWord(n.div("100"))} hundred ${toWord(n.mod("100"))}`.trim()
	}
}
function formatDefault(n) {
	let str = EternalNotations.HTMLPresets.Default.format(n);
	while (/e/.test(str)) {
		str = str.replace(/([^e<>]+)e(.+)/g, "$1 × 10<sup>$2</sup>")
			.replace(/e(.+)/g, "10<sup>$1</sup>");
	};
	return str;
}
let lastTs = 0, speed = 1, paused = false;
function slowDown() {
	speed /= 2;
}
function speedUp() {
	speed *= 2;
}
function reverse() {
	speed = -speed;
}
function resetSpeed() {
	speed = 1;
}
function pause() {
	paused = !paused;
}
function update(time) {
	t += (time - lastTs) / 1e3 * (paused ? 0 : speed);
	t = Math.min(127685.83054685818, Math.max(0, t));
	let num = Decimal.tetrate(10, t / 19200 + 1).add(t / 2).sub(10).min("(e^6)3000.47712125471966244").floor(); // Decimal.iteratedexp("1000", "6", Decimal.pow("1.5", t).add(t).floor()).mul("1000").floor();
	document.getElementById("num").innerHTML = formatDefault(num);
	document.getElementById("num").style.fontFamily = document.getElementById("fontinput").value;
	document.getElementById("num_illion").style.fontFamily = document.getElementById("fontinput").value;
	document.getElementById("num").style.backgroundImage = `repeating-linear-gradient(-45deg, #ffffff, hsl(${num.slog().mul("30").toString()}deg, 100%, ${Decimal.sub("100", num.slog().mul("2.5")).max("50").toString()}%) 25%, #ffffff 50%)`;
	document.getElementById("num_illion").innerHTML = formatIllion(num);
	document.getElementById("factor").innerText = `Speed: x${EternalNotations.Presets.Default.format(speed)} | NOTE: This uses a modified system that makes illions like "micro-unmillillion" possible to appear.`;
	document.getElementById("pause").innerText = paused ? "Continue" : "Pause";
	lastTs = time;
	requestAnimationFrame(update);
}
update(0)