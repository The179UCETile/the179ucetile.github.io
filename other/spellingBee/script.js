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
  let score = 0;
  let word = words[Math.floor(Math.random() * words.length)];
  function getTime(score, min, start, pow, speed) {
    return Math.max(min, start / (score * speed + 1) ** pow)
  }
  function check() {
    if (document.getElementById("wordInput").value == word) {
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
    document.getElementById("gameover").style.display = "";
    document.getElementById("main").style.display = "none";
  }
  function update() {
    let timeRemain = getTime(score, 1, 10, 1.2, .05);
    document.getElementById("word").innerHTML = `<p>${word}</p>`;
    document.getElementById("word").style.filter = `blur(${Math.sqrt(score) * .5}px)`;
    document.getElementById("timeRemaining").innerHTML = `${((timeRemain * 1e3 - (Date.now() - timestamp)) / 1e3).toFixed(2)}s`;
    if (timeRemain * 1e3 - (Date.now() - timestamp) < 0) endGame()
  }
  function startGame() {
    word = words[Math.floor(Math.random() * words.length)];
    score = 0;
    document.getElementById("main").style.display = "";
    document.getElementById("gameover").style.display = "none";
    document.getElementById("wordInput").value = "";
    timestamp = Date.now();
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