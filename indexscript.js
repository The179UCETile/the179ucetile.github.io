const tickermsg = ["hi", "tw.nw119.me ~ I&apos;m a furry", "dominoguy_ uses AI for coding (effectively vibecoding)", "No RenaultFan Delete RenaultFan Yes haster Add haster", "No jQuery was used on this news ticker"];
function updateTicker() {
  document.getElementById("tickermessage").style.color = "rgba(255,255,255,0)";
  setTimeout(()=>{
    document.getElementById("tickermessage").innerHTML = tickermsg[Math.floor(Math.random()*tickermsg.length)];
    document.getElementById("tickermessage").style.color = "rgba(255,255,255,1)";
  },400);
}
document.onload(()=>{updateTicker()});
setInterval(updateTicker, 20000);