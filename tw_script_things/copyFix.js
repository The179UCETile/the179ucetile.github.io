function Zr(e) {
  if (Array.isArray(e)) {
    return [[e[0] ?? 0, e[1] ?? 0, e[2] ?? 0], e[3] ?? 0];
  }
  if (typeof e !== "number" || !isFinite(e)) {
    return [0, 0];
  }
  return [e % 31, Math.floor(e / 31)];
}
function rr() {
  let t = 20 * Math.floor(cursor.x / 20)
  , r = 10 * Math.floor(cursor.y / 10)
  , a = w.chunks.get(t + "," + r);
  if (!a || null == a.txt)
    return !1;
  let o = cursor.x - t + 20 * (cursor.y - r);
  let color = a.clr[o];
  return [a.txt[o], color]
};
function Gn(e) {
  return " " == e || e == String.fromCharCode(10240)
}
function Qn(e, t) {
  return Gn(e) && 0 == (2 & t) && 0 == (1 & t)
}
function ar(e) {
  let b = document.getElementById("clipboard");
  navigator.clipboard ? navigator.clipboard.writeText(e) : (b.value = e,
    b.focus(),
    b.select(),
    document.execCommand("copy"))
}
function copy(e) {
  let canvas = document.getElementsByTagName("canvas")[0];
  canvas.style.cursor = "crosshair";
  let regionSelection = new RegionSelection();
  regionSelection.onSelection(function (sx, ex, sy, ey) {
    var l = cursor.x
      , u = cursor.y;
    cursor.x = sx,
      cursor.y = ex;
    for (var s = "", d = "", f = !1, v = !1, h = ex; h <= ey; h++) {
      for (var y = sx; y <= sy; y++) {
        var g = rr();
        if (g) {
          g[0] == String.fromCharCode(27) ? s += " " : s += g[0];
          var [p, b] = Zr(g[1]);
          if (elem.copycolour.checked) {
            if (Array.isArray(g[1])) {
              var rgb = g[1];
              d += "[";
              for (let i = 0; i < 3; i++) {
                d += String.fromCharCode(192 + (rgb[i] >> 6)) +
                String.fromCharCode(192 + (rgb[i] & 63));
              }
              d += elem.copydecorations.checked ? String.fromCharCode(192 + b) : String.fromCharCode(192);
              d += "]";
            } else {
              d += String.fromCharCode(192 + g[1]);
            }
          } else if (elem.copydecorations.checked) {
            d += String.fromCharCode(192 + b);
          }
          Qn(g[0], b) || (0 != b && (v = !0),
            0 != p && (f = !0)),
            cursor.x++
        }
      }
      cursor.x = sx,
        cursor.y++,
        s += "\n",
        d += "�";
    }
    s = s.slice(0, -1),
      d = d.slice(0, -1),
      s.startsWith("http") && (f = v = !1),
      elem.copycolour.checked && f || elem.copydecorations.checked && v ? ar(s + String.fromCharCode(27) + d) : ar(s),
      cursor.x = l,
      cursor.y = u,
      w.showToast("Copied selection.", 1500);
    let x = document.getElementById("copyico");
    x.src = "/static/done.svg",
    setTimeout((function () {
      x.src = "/static/copy.svg"
    }), 1e3)
  });
  regionSelection.startSelection();
  w.showToast("Select an area to copy.", 1500);
}
document.getElementById("copy").remove();
let c = document.createElement("div");
c.id = "copy";
c.className = "infobtn";
c.title = "Copy";
c.innerHTML = '<img id="copyico" alt="copy" src="/static/copy.svg" class="nohover">';
c.addEventListener("click", copy);
document.getElementById("paste").before(c);
