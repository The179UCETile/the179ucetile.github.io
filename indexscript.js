const tickermsg = ["hi", "tw.nw119.me ~ I'm a furry", "dominoguy_ uses AI for coding (effectively vibecoding", "No RenaultFan Delete RenaultFan Yes haster Add haster", "No jQuery was used on this news ticker"];
let elem = document.getElementById("tickermessage");
function updateTicker() {
  elem.style.color = "rgba(255,255,255,0)";
  setTimeout(()=>{
    elem.innerHTML = tickermsg[Math.floor(Math.random()*tickermsg.length)];
    elem.style.color = "rgba(255,255,255,1)";
  }, 1000);
}
setInterval(updateTicker, 10000);