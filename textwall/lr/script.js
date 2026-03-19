function Lr(e) {
  if ("" == (e = decodeURI(e.toLowerCase())) || "~main" == e)
    return {x: 0, y: 0};
  var r = function (e) {
    const len = (e + "").length;
    for (var n, a = [], o = e + "", i = 0; i < len;)
      a[255 & i] = 255 & (n ^= 19 * a[255 & i]) + o.codePointAt(i++);
    var c, l = a.length, u = this, s = 0, d = (i = u.i = u.j = 0, u.S = []);
    for (l || (a = [l++]); s < 256;)
      d[s] = s++;
    for (s = 0; s < 256; s++)
      d[s] = d[i = 255 & i + a[s % l] + (c = d[s])],
      d[i] = c;
    var f = function (e) {
      for (var t, n = 0, r = u.i, a = u.j, o = u.S; e--;)
        t = o[r = 255 & r + 1],
        n = 256 * n + o[255 & (o[r] = o[a = 255 & a + t]) + (o[a] = t)];
      return u.i = r, u.j = a, n
    };
    return f(256), function () {
      for (var e = f(6), t = 281474976710656, n = 0; e < 4503599627370496;)
        e = 256 * (e + n),
        t *= 256,
        n = f(1);
      for (; e >= 9007199254740992;)
        e /= 2,
        t /= 2,
        n >>>= 1;
      return (e + n) / t
    }
  }(e);
  return {
    x: 20 * Math.floor((Math.floor(2e5 * r()) - 1e5) / 20),
    y: 10 * Math.floor((Math.floor(2e5 * r()) - 1e5) / 10)
  }
};
setInterval(()=>{
  const coords = Lr(document.getElementById("tpword").value);
  coords.y = -coords.y;
  coords.abs = {x: Math.abs(coords.x), y: Math.abs(coords.y)};
  let type = "common";
  if (coords.abs.x % 10000 == 0 || coords.abs.y % 10000 == 0 || coords.abs.x == 100000 || coords.abs.y == 100000 && !(coords.abs.x < 250 && coords.abs.y < 250)) {
    type = "rare"
  } else if (coords.abs.x == 69420 || coords.abs.y == 69420) {
    type = "nice"
  } else if (coords.abs.x == coords.abs.y) {
    type = "diagonal"
  } else if ((coords.abs.x < 250 && coords.abs.y < 250) || (coords.abs.x > 99750 && coords.abs.y > 99750)) {
    type = "very rare"
  } else if ((coords.abs.x < 50 && coords.abs.y < 50) || (coords.abs.x > 99950 && coords.abs.y > 99950)) {
    type = "almost mythical"
  } else if ((coords.x == 0 && coords.y == 0) || (coords.abs.x == 100000 && coords.abs.y == 100000)) {
    type = "mythical"
  } else {};
  document.getElementById("coords").innerHTML = `X: ${coords.x}, Y: ${coords.y} (this is a ${type} wall)`
}, 50)