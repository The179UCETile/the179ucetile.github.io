/*
run on nrtc2.github.io/textwall3
LDM applies when zoom < 8%
use the slider above!
*/
function getAvgColor(chunk) {
  const colors = [];
  let avgColor = [0, 0, 0];
  for (let i in chunk.clr) {
    if (Array.isArray(chunk.clr[i])) {
      colors.push(chunk.txt[i] == " " ? [0, 0, 0] : chunk.clr[i].slice(0,3))
    } else {
      const clrArray = [];
      for (let i = 0; i < 3; i++) {
        clrArray.push(parseInt((chunk.txt[i] == " " ? "#000000" : chunk.clr[i] == 0 ? "#ffffff" : (colorHexs[chunk.clr[i]] ?? "#000000")).slice(1 + i * 2, 3 + i * 2), 16))
      };
      colors.push(clrArray);
    }
  }
  for (let i in colors) {
    avgColor[0] = avgColor[0] + colors[i][0] / 200;
    avgColor[1] = avgColor[1] + colors[i][1] / 200;
    avgColor[2] = avgColor[2] + colors[i][2] / 200;
  };
  avgColor = avgColor.map(c => Math.floor(c).toString(16).padStart(2, "0"));
  return `#${avgColor.join("")}`
}
Xt = function(e, t) {
            var a = chunks.get(e);
            if (null != a && null != a.txt) {
                var o = zt(e);
                if (a.empty = o,
                    o) {
                    qt(e);
                    var i = wt(e)
                        , c = i[0] + 20 + "," + i[1];
                    if (chunks.has(c)) {
                        var l = chunks.get(c);
                        null != l.txt && (zt(c) ? (l.empty = true,
                            qt(c)) : t && It(c, false))
                    }
                } else {
                    var u = mt()
                        , d = ht();
                    null == a.img && (null != window.OffscreenCanvas ? a.img = new OffscreenCanvas(u, d) : a.img = document.createElement("canvas")),
                        a.img.width = u,
                        a.img.height = d,
                        function (e, t, n, a, o) {
                            var c = chunks.get(a);
                            let res = Math.max(1, 2 ** Math.floor(Math.log10(1 / (zoomValue / .08))));
                            e.imageSmoothingEnabled = false,
                                e.textBaseline = "alphabetic",
                                e.textAlign = "left",
                                e.fillStyle = zoomValue <= 0.08 ? getAvgColor(c) : c.protected ? A : C, // you can change this
                                e.fillRect(0, 0, t, n);
                            var l, u, s = {}, d = false, f = wt(a), v = f[0] - 20 + "," + f[1];
                            if (chunks.has(v)) {
                                var m = chunks.get(v);
                                null == m.edge || !m.protected && c.protected || (l = m.edge)
                            }
                            if (zoomValue > 0.08) { // you can change this
                            for (var h, y = t / Et, g = specialFonts.get(selectedFont), p = 16 * ft(), b = 0; b < 10; b += res)
                                for (var x = -2; x < 20; x += res) {
                                    var w = t / 20 * x
                                        , M = n / 10 * b;
                                    if (x < 0 && null != l) {
                                        var k = x + 20 * b;

                                        if (null != l[k]) {
                                            var E = l[k];
                                            Kt(e, E[2]),
                                                null != g && g.charMap.has(E[0].codePointAt()) ? (g.bold = E[3],
                                                    g.italic = E[4],
                                                    Ut(g, e, E[0], w, M, y, p)) : (e.font = E[1] ? Nt(y) : Q,

                                                        E[3] && Wt(e),
                                                        E[4] && Ht(e),
                                                        jt(e, E[0], w, M, y))
                                        }
                                    }
                                    if (!(x < 0)) {
                                        var S = c.txt[x + 20 * b]
                                            , clrVal = c.clr[x + 20 * b]
                                            , I = Array.isArray(clrVal) ? [clrVal, clrVal[3] || 0] : Zr(clrVal)
                                            , T = I[1];
                                        S = (zoomValue <= 0.08 && (S != " " || (u = S.codePointAt(0)) >= 9472 && u <= 9632 && !(u >= 9476 && u <= 9483) && !(u >= 9548 && u <= 9551) || u >= 9698 && u <= 9701)) ? "█" : S;
                                        var cellProtected = c.textProtected && c.textProtected[x + 20 * b] === "1";
                                        if (cellProtected && !c.protected) {
                                            e.fillStyle = A;
                                            e.fillRect(Math.floor(w), Math.floor(M), Math.ceil(t / 20), Math.ceil(n / 10));
                                        }
                                        if (!Qn(S, T)) {
                                            var B = S.codePointAt()
                                                , F = I[0];
                                            Kt(e, F),
                                                e.font = Q;
                                            var P = false;
                                            8 & T && (P = true,
                                                Wt(e));
                                            var L = false;
                                            if (4 & T && (L = true,
                                                Ht(e)),
                                                (h = B) >= 58112 && h <= 58124 && (B = generateRandomChar(B),
                                                    S = String.fromCodePoint(B)),
                                                (u = B) >= 9472 && u <= 9632 && !(u >= 9476 && u <= 9483) && !(u >= 9548 && u <= 9551) || u >= 9698 && u <= 9701 || isCodePointBraille(B))
                                                e.font = Math.round(20 * res * y) + "px Special",
                                                    e.fillText(S, Math.round(w), Math.floor(M + 15 * y));
                                            else {
                                                var O = false;
                                                extendedPictographicRegExp && B >= 65536 && extendedPictographicRegExp.test(S) && (O = true,
                                                    e.font = Nt(y)),
                                                    null != g && g.charMap.has(B) ? (g.bold = P,
                                                        g.italic = L,
                                                        Ut(g, e, S, w, M, y, p)) : jt(e, S, w, M, y),
                                                    x >= 18 && (s[x - 20 + 20 * b] = [S, O, F, P, L],
                                                        d = true)
                                            }


                                            2 & T && e.fillRect(Math.floor(w - .5 * y), Math.round(M + 17.5 * y), Math.ceil(11 * y), Math.ceil(y)),
                                                1 & T && e.fillRect(Math.floor(w - .5 * y), Math.floor(M + 9 * y), Math.ceil(11 * y), Math.ceil(y));

                                        }
                                    }
                                }
                            if (c.edge = d ? s : void 0,
                                o) {
                                var R = f[0] + 20 + "," + f[1];
                                chunks.has(R) && null != chunks.get(R).txt && It(R, false)
                            }}
                        }(a.img.getContext("2d", {
                            alpha: false
                        }), u, d, e, t),
                        a.dpr = v,
                        a.font = Q,
                        isBrowserFirefox && createImageBitmap(a.img).then((function (t) {
                            if (chunks.has(e)) {
                                var a = chunks.get(e);
                                null != a.bmp && a.bmp.close(),
                                    a.bmp = t,
                                    ge = true
                            }
                        }
                        )),
                        a.empty = false
                }
            }
        }
let slider = document.createElement("input");
slider.setAttribute("type", "range");
slider.setAttribute("min", "-2");
slider.setAttribute("max", "1");
slider.setAttribute("value", "0");
slider.setAttribute("step", "0.0000001");
slider.style.position = "fixed";
slider.style.top = "25px";
slider.style.left = "150px";
slider.style.width = "800px";
document.body.appendChild(slider);
slider.addEventListener("input", ()=>{
  zoomValue = 10 ** slider.value;
  w.showToast(Math.floor(zoomValue * 100) + "%", 1500);
  kn()
})
