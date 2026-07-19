let btn = document.createElement("div");
btn.className = "bubble clickable";
btn.title = "Copy character color";
btn.innerHTML = '<img id="copyico" alt="copy character color" src="/static/copy.svg" class="nohover">';
btn.addEventListener("click", ()=>{
  w.changeColor(getCharInfo().color);
  w.showToast("Successfully copied character color.", 1500)
});
document.getElementById("bubbles").appendChild(btn);
