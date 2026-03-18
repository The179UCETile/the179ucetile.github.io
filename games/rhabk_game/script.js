// does rhabk understand??
let audio = document.getElementById("gameTheme");
audio.loop = true;
audio.preload = true;
for (let i = 1; i < 8; i++) {
  let A = document.getElementById(`sfx${i}`);
  A.preload = true;
}
function playAudio() {
  audio.pause();
  audio.currentTime = 0;
  audio.play()
}
function playSFX(num) {
  let A = document.getElementById(`sfx${num}`);
  A.pause();
  A.currentTime = 0;
  A.play()
}
let t = Date.now();
function update() {
  setInterval(()=>{
    const timeLeft = (864e5 - (Date.now() - t)) / 1e3;
    if (timeLeft < 0) {
      document.getElementById("fakeGame").style.display = "none";
      document.getElementById("win").style.display = "";
    } else {
      if (Math.random() < 10 ** (-6 + Math.floor((86400 - timeLeft) / 28800) + 1)) {
        playSFX(Math.floor(Math.random() * 7 + 1))
      }
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