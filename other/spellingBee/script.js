try {
  fetch("words.txt")
  .then(x => x.text())
  .then(doTheThing)
} catch (e) {
  alert(e.stack)
}
/*
TODO:
Add difficulties
*/
function doTheThing(data) {
  const words = data.split("\n");
  let timestamp = Date.now();
  let gameStartTimestamp = Date.now();
  let gameEnded = false;
  let score = 0;
  let word = words[Math.floor(Math.random() * words.length)];
  let totalChars = 0;
  function formatTime(s) {
    if (s < 3600) return `${String(Math.floor(s / 60 + 100)).slice(1)}:${String(Math.floor(s % 60 + 100)).slice(1)}`;
    return `${String(Math.floor(s / 3600 + 100)).slice(1)}:${String(Math.floor((s / 60) % 60 + 100)).slice(1)}:${String(Math.floor(s % 60 + 100)).slice(1)}`
  }
  function getTime(score, min, start, pow, speed) {
    return Math.max(min, start / (score * speed + 1) ** pow)
  }
  function check() {
    if (document.getElementById("wordInput").value == word) {
      totalChars += word.length;
      word = words[Math.floor(Math.random() * words.length)];
      document.getElementById("wordInput").value = "";
      timestamp = Date.now();
      score++;
      document.getElementById("wordInput").focus();
    } else {
      endGame();
    }
  }
  function endGame() {
    gameEnded = true;
    document.getElementById("gameover").style.display = "";
    document.getElementById("main").style.display = "none";
    document.getElementById("gameoverInfo").innerHTML = `Your score was: ${score.toLocaleString("en-US")}<br>Average WPM: ${Math.floor(totalChars / ((Date.now() - gameStartTimestamp) / 1e3) / 5 * 60)}<br>You survived for ${formatTime((Date.now() - gameStartTimestamp) / 1e3)}.`;
  }
  function update() {
    let timeRemain = getTime(score, 0.2, 2, 1.175, .03) * 1e3 * word.length;
    document.getElementById("word").innerHTML = `<p>${word}</p>`;
    document.getElementById("word").style.filter = `blur(${Math.sqrt(score) * .5}px)`;
    document.getElementById("timeRemaining").innerHTML = `<p>${((timeRemain - (Date.now() - timestamp)) / 1e3).toFixed(2)}s</p>`;
    document.getElementById("timeRemaining").style.width = `${100 - (Date.now() - timestamp) / timeRemain * 100}%`;
    if (timeRemain - (Date.now() - timestamp) < 0 && !gameEnded) endGame()
  }
  function startGame() {
    gameEnded = false;
    word = words[Math.floor(Math.random() * words.length)];
    totalChars = 0;
    score = 0;
    document.getElementById("main").style.display = "";
    document.getElementById("gameover").style.display = "none";
    document.getElementById("wordInput").value = "";
    timestamp = Date.now();
    gameStartTimestamp = Date.now();
  }
  document.getElementById("wordInput").addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
      check();
    }
  });
  document.getElementById("retry").addEventListener("click", startGame);
  document.getElementById("check").addEventListener("click", check);
  setInterval(update, 16)
}