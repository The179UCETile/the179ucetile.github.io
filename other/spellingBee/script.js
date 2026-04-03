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
  let word = words[Math.floor(Math.random() * words.length)];
  function check() {
    if (document.getElementById("wordInput").value == word) {
      word = words[Math.floor(Math.random() * words.length)];
      document.getElementById("wordInput").value = "";
      timestamp = Date.now();
      score++;
    } else {
      endGame();
    }
  }
  function endGame() {
    document.getElementById("gameover").style.display = "";
    document.getElementById("main").style.display = "none";
  }
  function update() {
    document.getElementById("word").innerHTML = `<p>${word}</p>`;
    document.getElementById("word").style.filter = `blur(${Math.sqrt(score) * .3}px)`;
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