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
  let $ = document.getElementById;
  let word = words[Math.floor(Math.random() * words.length)];
  function check() {
    if ($("wordInput").value == word) {
      word = words[Math.floor(Math.random() * words.length)];
      $("wordInput").value = "";
      timestamp = Date.now();
    } else {
      endGame();
    }
  }
  function endGame() {
    $("gameover").style.display = "";
    $("main").style.display = "none";
  }
  function update() {
    $("word").innerHTML = `<p>${word}</p>`;
    $("word").style.filter = `blur(${Math.sqrt(score) * .3}px)`;
  }
  function startGame() {
    word = words[Math.floor(Math.random() * words.length)];
    score = 0;
    $("main").style.display = "";
    $("gameOver").style.display = "none";
    $("wordInput").value = "";
    timestamp = Date.now();
  }
  $("wordInput").addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
      check();
    }
  });
  $("retry").addEventListener("click", () => {
    startGame();
  })
  setInterval(update, 16)
}