let btn = document.createElement("div");
btn.className = "bubble clickable";
btn.title = "Screenshot";
btn.innerHTML = '<img id="screenshot" alt="screenshot" src="https://uxwing.com/wp-content/themes/uxwing/download/video-photography-multimedia/camera-white-icon.png" width="24" height="24" class="nohover">';
btn.addEventListener("click", ()=>{
let canvas = document.querySelector("canvas");
let screenshot = document.createElement("canvas");
screenshot.setAttribute("width", canvas.getAttribute("width"));
screenshot.setAttribute("height", canvas.getAttribute("height"));
screenshot.style.display = "none";
let scsCtx = screenshot.getContext("2d");
function formatISODate(d) {
  return `${d.getUTCFullYear()}-${(d.getUTCMonth() + 1).toString().padStart(2, "0")}-${d.getUTCDate().toString().padStart(2, "0")}T${d.getUTCHours().toString().padStart(2, "0")}:${d.getUTCMinutes().toString().padStart(2, "0")}:${d.getUTCSeconds().toString().padStart(2, "0")}.${d.getUTCMilliseconds().toString().padStart(3, "0")}Z`;
}
function wrt(text, x, y) {
  scsCtx.strokeText(text, x, y);
  scsCtx.fillText(text, x, y);
}
function wrtT(text, x, y) {
  scsCtx.strokeText(text, x, canvas.getAttribute("height") - y);
  scsCtx.fillText(text, x, canvas.getAttribute("height") - y);
}
let size = 3;
scsCtx.font = `${size}em Consolas, monospace, 'courier new', Courier, special`;
scsCtx.fillStyle = "#fff";
scsCtx.strokeStyle = "#000";
scsCtx.lineWidth = size * 1.25;
scsCtx.drawImage(canvas, 0, 0);
scsCtx.textBaseline = "top";
wrt(formatISODate(new Date()), 10, 10);
wrt(`/~${w.wall}/${w.subwall}`, 10, 10 + size * 12.5);
wrt(`${cursor.x}, ${-cursor.y}`, 10, 10 + size * 25);
scsCtx.textBaseline = "alphabetic";
wrtT(`~${localStorage.username}`, 10, 10 + size * 12.5);
wrtT(`${localStorage.zoom}x`, 10, 10);
screenshot.toBlob(function (blob) {
  if (!blob) {
    w.showToast("Failed to download.");
    return;
  }
  let url = URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.href = url;
  let d = new Date();
  let r = formatISODate(d)
  a.download = `TextWall Screenshot /~${w.wall}/${w.subwall} ${r}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}, 'image/png');
screenshot.remove();
});
document.getElementById("bubbles").appendChild(btn);
