function format(n) {
	let str = EternalNotations.HTMLPresets.Default.format(n);
	while (/e/.test(str)) {
		str = str.replace(/([^e<>]+)e(.+)/g, "$1 × 10<sup>$2</sup>")
			.replace(/e(.+)/g, "10<sup>$1</sup>");
	};
	return str;
}
function _$(id) {
  return document.getElementById(id)
}
function update(t) {
  let x = new Decimal(_$("_x").value);
  let y = new Decimal(_$("_y").value);
  let n = new Decimal(_$("_n").value).floor();
  let result = y.mul(x.add(n).factorial()).div(x.factorial()).div(n.factorial());
  if (x.add(n).factorial().div(x.factorial()).div(x.pow(n)).sub(1).abs().lte(0.000001) ||
    x.add(n).factorial().div(x.factorial()).eq(1) ||
    n.gte("1e10")) {
    if (x.gt(n)) {
      result = Decimal.pow(10, n.pow(n).div(n.factorial()).log10().mul(x.log10().div(n.log10()))).mul(y);
    } else {
      result = y.mul(n.pow(x)).div(x.factorial());
    }
  }
  if (x.eq(0)) result = new Decimal(0);
  _$("result").innerHTML = format(result);
  requestAnimationFrame(update);
}
requestAnimationFrame(update)