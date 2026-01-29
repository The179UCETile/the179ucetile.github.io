const messages = ["hi", "tw.nw119.me ~ I&apos;m a furry", "dominoguy_ uses AI for coding (effectively vibecoding", "No RenaultFan Delete RenaultFan Yes haster Add haster", "No jQuery was used on this news ticker"];
function updateTicker() {
  document.getElementById("news").getElementById("content").style.color = "rgba(255,255,255,0)";
  setTimeout(()=>{
    document.getElementById("news").getElementById("content") = messages[Math.floor(Math.random()*messages.length)];
    document.getElementById("news").getElementById("content").style.color = "rgba(255,255,255,1)"
  }, 1000);
}
setInterval(updateTicker, 20000)