const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let index = 0;
const ts = Date.now();
ctx.translate(canvas.width / 2, canvas.height / 2);
function mapX(expectX) {
  return expectX / 2 * canvas.width
}
function mapY(expectY) {
  return expectY / 2 * canvas.height
}
function render(id) {
  const t = (Date.now() - ts) / 1e3;
  ctx.clearRect(mapX(-1), mapY(-1), canvas.width, canvas.height);
  switch (id) {
    case 0: {
      ctx.beginPath();
      ctx.moveTo(mapX(-1), mapY(0));
      for (let i = 0; i <= 50; i++) {
        ctx.lineTo(mapX(i / 25 - 1), mapY(Math.sin((i / 25 + t) * Math.PI * 2)) / 2)
      };
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke()
    }; break;
  }
};
setInterval(()=>{render(index)})