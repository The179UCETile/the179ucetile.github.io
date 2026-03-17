// does rhabk understand??
let audio = document.getElementById("gameTheme");
audio.loop = true;
audio.preload = true;
function playAudio() {
  audio.pause();
  audio.currentTime = 0;
  audio.play()
}
let t = Date.now();
function update() {
  const timeLeft = (864e5 - (Date.now() - t)) / 1e3;
  setInterval(()=>{
    if (timeLeft < 0) {
      document.getElementById("fakeGame").style.display = "none";
      document.getElementById("win").style.display = "";
    } else {
      document.getElementById("chapter").innerHTML = `YOUR CURRNTLY ON CHALPER ${Math.floor((86400 - timeLeft) / 28800) + 1}`;
      document.getElementById("timeLeft").innerHTML = `${timeLeft} secknds lft!!!!`
    }
  }, 16)
}
document.getElementById("rhabk is trash").addEventListener("click", function () {
  t = Date.now();
  document.getElementById("titleScreen").style.display = "none";
  document.getElementById("fakeGame").style.display = "";
  playAudio();
  update()
})