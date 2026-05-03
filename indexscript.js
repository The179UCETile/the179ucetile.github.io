const tickermsg = [
  "hi",
  "tw.nw119.me ~ I&apos;m a furry",
  "dominoguy_ uses AI for coding (effectively vibecoding)",
  "No RenaultFan Delete RenaultFan Yes haster Add haster",
  "No jQuery was used on this news ticker"
]/*[
  "happy april fools!",
  `<a href="/textwall/pypedia">BEST ENCYCLOPEDIA EVER TRUST</a>`,
  "py_alt ~ THIS SITE IS TRASH!!!!!!!!!",
  "No Bzuki Delete Bzuki Yes RenaultFan Add RenaultFan",
  "py_alt's punishment power: 0",
  "py_alt ~ DELETE THIS SITE NOW!!!!!!!!!!!",
  "py_alt ~ MUTE THE CREATOR OF THIS SITE NOW!!!!!!"
]*/;
function updateTicker() {
  document.getElementById("tickermessage").style.color = "rgba(255,255,255,0)";
  setTimeout(()=>{
    document.getElementById("tickermessage").innerHTML = tickermsg[Math.floor(Math.random()*tickermsg.length)];
    document.getElementById("tickermessage").style.color = "rgba(255,255,255,1)";
  },200);
}
setInterval(updateTicker, 20000);
document.getElementById("tickermessage").innerHTML = tickermsg[Math.floor(Math.random()*tickermsg.length)];