function fmod(a, b) {
  return ((a % b) + b) % b
}
function gcc(x, y) {
  let tileX = Math.floor(x/20)*20;
  let tileY = Math.floor((-y)/10)*10;
  return Tile.get(tileX, tileY).clr[fmod(x, 20) + fmod(-y, 10) * 20]
}
let btn = document.createElement("div");
btn.className = "bubble clickable";
btn.title = "Copy character color";
btn.innerHTML = '<img id="copyico" alt="copy character color" src="/static/copy.svg" class="nohover">';
btn.addEventListener("click", ()=>{
  w.changeColor(Array.isArray(gcc(cursor.x, -cursor.y)) ? gcc(cursor.x, -cursor.y).slice(0, 3) : gcc(cursor.x, -cursor.y));
  w.showToast("Successfully copied character color.", 1500)
});
document.getElementById("bubbles").appendChild(btn);
