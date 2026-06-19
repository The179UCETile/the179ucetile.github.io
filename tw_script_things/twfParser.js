function escapeTWF(str) {
  let newstr = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] != "\\") {
      newstr += str[i]
    } else {
      i++;
      newstr += "[]\\".split("").includes(str[i]) ? String.fromCodePoint(0xfdd0, 0xfdd1, 0xfdd2).split("")["[]\\".split("").indexOf(str[i])] : "";
    }
  };
  return newstr;
}
function decodeNonchar(str) {
  return str.replace(/\ufdd0/g, "[")
  .replace(/\ufdd1/g, "]")
  .replace(/\ufdd2/g, "\\")
  .replace(/\ufdd3/g, " ")
}
function parseTWF(data) {
  data = escapeTWF(data);
  let obj = { fontInfo: {}, glyphs: {}, kerningData: {} }, splittedData = [], line = "", inCharData = false;
  for (let i = 0; i < data.length; i++) {
    let c = data[i]
    if ((c == "\n" && !inCharData) || i == (data.length - 1)) {
      if (i == (data.length - 1)) { line += c };
      splittedData.push(line);
      line = "";
    } else if (c == "[") {
      inCharData = true;
      line += c;
    } else if (c == "]") {
      inCharData = false;
      line += c;
    } else {
      line += c;
    };
  };
  for (let i in splittedData) {
    if (i != 0) {
      let l = splittedData[i].split(" ");
      splittedData[i] = `${l.slice(0, 5).join(" ")} ${l.slice(5).join(" ").replace(/\[\n(.+)\n\]/s, "[$1]").replace(/\x20/g, String.fromCodePoint(0xfdd3))}`;
    };
  };
  for (let i in splittedData) {
    let l = splittedData[i].split(" ");
    if (i == 0) {
      obj.fontInfo = {
        spacing: l[0],
        fontWeights: l.slice(1)
      }
    } else if (l[0] != "kern") {
      if (typeof obj.glyphs[l[0]] == "undefined") {
        obj.glyphs[l[0]] = {}
      }
      obj.glyphs[l[0]][l[1] == "space" ? " " : l[1]] = {
        glyph: decodeNonchar(l[5]).replace(/^\[|\]$/g, ""),
        width: l[2],
        height: l[3],
        descenderDepth: l[4]
      }
    } else if (l[0] == "kern") {
      obj.kerningData[l[1]] = {
        offsets: l.slice(2)
      }
    } else { 
      throw new Error("Failed to parse") 
    }
  }
  return obj;
}
