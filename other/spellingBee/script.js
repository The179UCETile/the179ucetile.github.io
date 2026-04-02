fetch("words.txt")
.then(x => x.text())
.then(y => doTheThing(y))
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
    }
  }
  function update() {
    $("word").innerHTML = `<p>${word}</p>`;
    $("word").style.filter = `blur(${Math.sqrt(score) * .3}px)`;
  }
  $("wordInput").addEventListener("keydown", (e) => {
    if (e.code == "Enter") {
      check()
    }
  })
  setInterval(update, 16)
}