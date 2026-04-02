try {
  fetch("words.txt")
  .then(x => x.text())
  .then(doTheThing)
} catch (e) {
  alert(e.stack)
}
function doTheThing(data) {
  const words = data.split("\n");
  let timestamp = Date.now();
  let score = 0;
  let g = document.getElementById;
  let word = words[Math.floor(Math.random() * words.length)];
  function check() {
    if (g("wordInput").value == word) {
      word = words[Math.floor(Math.random() * words.length)];
      g("wordInput").value = "";
      timestamp = Date.now();
    } else {
      endGame();
    }
  }
  function endGame() {
    g("gameover").style.display = "";
    g("main").style.display = "none";
  }
  function update() {
    g("word").innerHTML = `<p>${word}</p>`;
    g("word").style.filter = `blur(${Math.sqrt(score) * .3}px)`;
  }
  function startGame() {
    word = words[Math.floor(Math.random() * words.length)];
    score = 0;
    g("main").style.display = "";
    g("gameOver").style.display = "none";
    g("wordInput").value = "";
    timestamp = Date.now();
  }
  g("wordInput").addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
      check();
    }
  });
  g("retry").addEventListener("click", startGame);
  g("check").addEventListener("click", check)
  setInterval(update, 16)
}