const rawFontData = `  ▐ ▘▘𜶤𜴉▟𜴀𜵵𜴍𜷂𜴍▝ 𜵉 𜺫𜵈𜴖🯦𜷋𜺣  ▂𜺣  𜺠𜴍
  𜴚   𜴅𜺨𜶦▘𜴍🯦🮅𜴊  𜴝 𜴘▘  𜺫 ▗   𜴘 𜴍 
𜵉𜵈𜶛 🮂▌𜵳𜴍𜷀▖𜷂𜴶𜷂𜴶🮂▌𜷂▌𜷂▌𜴘 𜴘 𜶈𜺨𜴧𜴉𜵹𜴉𜵳𜴍
𜴝▘𜴱𜴉𜴭𜴉𜴧𜴍 𜴍𜴧𜴍𜴬𜴍 𜴍𜴬𜴍𜴧𜴍𜴃 🯧  𜺨🮂𜺨𜺨 𜴚 
𜷟▌𜷁𜵈𜷂🯦𜵉𜺨𜵊𜵈𜷂𜺨𜷂𜺨𜵊𜺨𜷀▌𜶘𜺨𜶘𜺨𜷀𜴍▌ 𜵏▌𜵮▌𜵊▌
𜴟𜴊𜴍𜴍𜴬𜴍𜴬𜴉𜴬𜴍𜴬𜴉𜴍 𜴬𜴍𜴍𜴍𜴱𜴉𜴱 𜴍𜴍𜴬𜴉𜴍𜴍𜴍𜴍𜴬𜴍
𜷂🯦𜵊▌𜷂🯦𜷁𜴶𜶘𜺨▌▌▌▌▌▌𜶅𜴍𜶅𜴍𜵳𜴍𜵊𜺨𜶅 🮂▌𜴎🯦  
𜴍 𜴬▌𜴍𜴍𜴧𜴍𜴡 𜴬𜴍𜴝▘𜴕𜴍𜴍𜴍𜴡 𜴬𜴉𜴬𜴉 𜴍𜴧𜴍  𜴧𜴉
𜴄 ▂𜺣𜷀 𜺠𜺣𜺠▌▂𜺣𜷁 𜵑▖𜷀 𜶑 𜶑 𜷀𜴉▐ ▂𜺣▂ 𜺠 
  𜴳𜴍𜴬𜴍𜴬𜴉𜴬𜴍𜴮𜴊𜴍 𜴪𜴍𜴍𜴍𜴡 𜴒 𜴍𜴍𜴡 𜴏𜴍𜴍𜴍𜴬𜴍
▂ 𜺠𜺣𜺠𜺣𜺠𜺣▐𜴉𜺣𜺣𜺣𜺣𜺣𜺣𜺣𜺣𜺣𜺣▂ 𜵙𜺨▐ 𜴠𜺣𜷋𜺣  
𜵏𜺨𜴄▌𜴍 𜴱 ▝𜴉𜴝𜴍𜴝▘𜴴𜴍𜴒𜴉𜵹𜴍𜴡𜴉▝𜴉▐ 𜴒 𜺨   
                                
                                
                                
                                
                                
                                
                                
                                
                                
                                
      𜵣𜵅                        
      𜴬𜴍                        
                                
                                
      𜵸𜴀                        
      𜴬𜴍                        
        𜷁𜵈▂𜺣𜵣𜴊𜵸𜴹                
        𜴍▌𜴳▌𜴬𜴉𜴬𜴉                
                𜷂𜺨▂𜺣            
                𜴬▖𜴮𜵅            
                                
                                
                                
                                
                                
                                
  𜵦 𜷕𜴉𜶽𜵅𜶳𜴀                      
  𜴬𜴉𜴡 𜴏𜴍𜴍𜴍                      
                    𜵣𜴊𜵣𜴊        
                    𜴪𜴍𜴪𜴍        
                                
                                
                  𜴩𜵅𜶳𜴀𜴩▖𜶳       
                  𜴭𜴉𜴡𜴉𜴭𜴉𜴡𜴉      `;
function processFontData(data, charW, charH) {
	const splitted = data.split("\n").map(a => a.split(/(?:)/u));
	let dataProcessed = new Map(), codepoint = 32;
	for (let i = 0; i < splitted.length; i += charH) {
		for (let j = 0; j < 16; j++) {
			const charData = [];
			for (let k = 0; k < charH; k++) {
				const line = [];
				for (let l = 0; l < charW; l++) {
					line.push(splitted[i + k][j * charW + l]);
				};
				charData.push(line);
			};
			dataProcessed.set(String.fromCodePoint(codepoint), charData);
			codepoint++;
		};
	};
	dataProcessed.set("glyphWidth", charW);
	dataProcessed.set("glyphHeight", charH);
	return dataProcessed;
}
const fontData = processFontData(rawFontData, 2, 2);
function TileToXY(tileX, tileY, charX, charY) {
	return {
		x: tileX * 16 + charX,
		y: tileY * 8 + charY
	};
}
function writeFontCharToXY(font, char, col, x, y, bCol) {
	const charData = font.get(char);
	for (let i = 0; i < font.get("glyphHeight"); i++) {
		for (let j = 0; j < font.get("glyphWidth"); j++) {
			writeCharToXY(charData[i][j], col, x + j, y + i - font.get("glyphHeight") + 1, bCol);
		};
	};
}
w.on("writeBefore", e => {
	if (fontData.keys().toArray().includes(e.char)) {
		let coords = TileToXY(e.tileX, e.tileY, e.charX, e.charY);
		writeFontCharToXY(fontData, e.char, e.color, coords.x, coords.y, e.bgColor);
		if (typeof cursorCoords != null) {
			let cursorCoordsXY = TileToXY(...cursorCoords);
			if ((cursorCoordsXY.x - 1) == coords.x && cursorCoordsXY.y == coords.y) {
				w.moveCursor("right", true, fontData.get("glyphWidth") - 1);
			};
		};
	};
	e.char = fontData.get(e.char)[fontData.get("glyphHeight") - 1][0];
});