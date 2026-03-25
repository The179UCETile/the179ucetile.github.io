const argamChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.font = "30px argam";
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.fillStyle = "#fff";
function mapX(expectX) {
  return expectX / 2 * canvas.width
}
function mapY(expectY) {
  return expectY / 2 * canvas.height
}
function getArgamTime(obj) {
  return `${argamChars[obj.getHours()]}:${argamChars[obj.getMinutes()]}:${argamChars[obj.getSeconds()]}`
}
function update() {
  const time = new Date();
  ctx.clearRect(mapX(-1), mapY(-1), canvas.width, canvas.height);
  ctx.fillText(getArgamTime(time), mapX(-0.5), mapY(0))
}
setInterval(update, 15)