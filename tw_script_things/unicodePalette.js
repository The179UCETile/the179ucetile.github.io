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
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  overflow: auto;
  gap: 5px;
  height: 175px;
  width: 100%;
  background-color: #333e;
  border: 2px solid #555;
  top: 0px;
  border-radius: 0 0 25px 25px;
}
#charContainer button {
  border: 2px solid #222;
  border-radius: 4px;
  background-color: #000;
  color: #fff;
  font-size: 1.1em;
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
const characters = "█■▔🭶🭷🭸🭹🭺🭻▁🮀🮁🮗▐▌▞▚▛▀▜▙▄▟▗▖▝▘🮕🮖░▒▓🮐🮒🮑🮘🮙▕🮇🮈🮉🮊🮋▉▊▋▍▎▏▂▃▅▆▇🮆🮅🮄🮃🮂🮞🮟🮝🮜🭈🭆🭂🭍🭑🬽🭣🭧🭓🭞🭜🭘🭊🭁🭇🭄🭏🬼🭌🬿🭥🭒🭢🭕🭠🭗🭝🭚◢◣◥◤🭃🭉🬾🭎🭔🭤🭙🭟🭅🭋🭀🭐🭖🭦🭛🭡🭮🭩🭯🭨🮛🭪🭬🭫🮚🭭🬞🬭🬏🬇🬋🬃🬁🬂🬀🬠🬰🬐🬦🬹🬓🬉🬎🬄🬙🬥🬖🬢🬔🬧🬡🬒🬜🬪🬶🬳🬈🬅🬣🬘🬯🬮🬛🬫🬴🬸🬤🬗🬕🬨🬚🬩🬝🬬🬵🬱🬲🬷🬌🬍🬺🬻🬊🬆━┃╺╸╻╹═║╌┄┈╍┅┉╎┆┊╏┇┋┍┯┑┝┿┥┕┷┙╒╤╕╞╪╡╘╧╛╓╥╖╟╫╢╙╨╜╔╦╗╠╬╣╚╩╝╲╳╱🮭🮬🮫🮪🮣🮢🮡🮠🮦🮥🮮🮤🮧🮩🮨".split(/(?:)/u);
for (let i in characters) {
  let btn = document.createElement("button");
  btn.addEventListener("click", ()=>{writeChar(characters[i], 1)});
  btn.innerHTML = characters[i];
  charContainer.appendChild(btn)
};
unicodePal.appendChild(closeBtn);
unicodePal.appendChild(charContainer);
document.getElementsByClassName("container")[0].appendChild(unicodePal);
