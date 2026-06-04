const prefixes = "gran,ex,met,supi,suter,versa,omn,hypi,etern,parad,plexi,dy,try,ad,en,scend,di,tri,dic,asc,sup,grea,xi,colos,ginorma,fiz,omeg,termin,lute,mil,bil,tril,quadr,micr,nan,pic,femt,kal,multi,terra,jova,gargantua,hysu,zenna,aetern,entrop,absur,phos,sud,norik,epusorik,ultimik,finth,gendr,th,memori,metro,mej,gi,ter,pet,exa,zet,yot,ron,que,incarn,ate,monstructa,maxim,demi,quasi,ulti,ji,ti,ter,petri,att,zept,yoct,ront,quec,pro,anti,tetrat,endian,us,pulmen,fino,exe,kiaro,ikai,opul,era,gen,kian,brony,renk,asyak,mendr,broth,ork,zy,extra,trances,ab,prem,fundam,trundam,undam,izer,zy,alp,bet,gam,del,psi,sort,conja,uni,dua,imag,nihil,neg,absil,zyro,expanta,eterna,minim,ubera,eka,disa,trisa,plusi,then,cryo,ployt,on,byzr,ol,realit,tayer,ziren,iren,tri,tetra".split(","),
  endings = "ia,ium,us,al,gen,ite,lic,cate,um,on,io,iko,o,try,rum,ion,oes,ic,uum,a,e,i,u,ol,am,is,finity".split(","), // -Num overflow is treated differently
  startings = "THE START OF ,THE END OF ,Post-,Limit of ".split(","),
  doubVowels = [["aa", "aia"],["ee", "ete"],["ii", "ini"],["oo", "ono"],["uu", "utu"]];
function generateRarityWord(prefs) {
  let output = "";
  for (let i = 0; i < prefs; i++) {
    output += prefixes[Math.floor(Math.random() * prefixes.length)]
  };
  output += endings[Math.floor(Math.random() * endings.length)]
  for (let i of doubVowels) {
    output = output.replace(new RegExp(`${i[0]}`, "g"), i[1]);
  };
  return output[0].toUpperCase() + output.slice(1)
}
function generateRarity(words, minPrefs, maxPrefs) {
  const arr = [];
  let starting = Math.random() < 0.25 ? startings[Math.floor(Math.random() * startings.length)] : "";
  for (let i = 0; i < words; i++) {
    arr.push(generateRarityWord(Math.floor(minPrefs + (maxPrefs - minPrefs + 1) * Math.random())))
  };
  let output = starting + arr.join(" ") + (Math.random() < 0.2 ? "Num overflow" : "");
  return (starting == "THE START OF " || starting == "THE END OF ") ? output.toUpperCase() : output;
}
function _$(id) {
  return document.getElementById(id)
}
_$("generate").addEventListener("click", () => {
  let results = [];
  for (let i = 0; i < parseFloat(_$("rarityAmt").value); i++) {
    results.push(generateRarity(Math.floor(parseFloat(_$("minWordAmt").value) + (parseFloat(_$("maxWordAmt").value) - parseFloat(_$("minWordAmt").value + 1)) * Math.random()), parseFloat(_$("minPrefAmt").value), parseFloat(_$("maxPrefAmt").value)))
  };
  _$("results").innerText = results.join("\n")
})