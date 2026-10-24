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
function productNums(min, max) {
  if (max.eq(min)) return max;
  if (max.div(min).lt("1.00001")) return max.pow(max.sub(min));
  if (min.lt(1)) return max.factorial();
  return max.factorial().div(min.factorial())
}
function choose(n, k) {
  return n.factorial().div(k.factorial().mul(n.sub(k).factorial()))
}
function multiderviative(x, y, n) {
  let t = x.mul(y);
  if (x.eq(0)) return new Decimal(0);
  if (t.lt(0)) return multiderviative(x.abs(), y.abs(), n).neg();
  if (t.lt(1) && t.gt("0.0001") && n.gt(4) && n.lt("1e6")) {
    return choose(t.add(n).sub(1), n);
  } else if (t.lte("0.0001") && n.gt(4) || (t.lt(1) && n.gte("1e6"))) {
    return t.div(n);
  // predefined formulae
  } else if (n.lt(0)) {
    return new Decimal(0);
  } else if (n.eq(0)) {
    return y;
  } else if (n.eq(1)) {
    return t;
  } else if (n.eq(2)) {
    return t.mul(t.add(1)).div(2);
  } else if (n.eq(3)) {
    return t.mul(t.add(1)).mul(t.add(2)).div(6);
  } else if (n.eq(4)) {
    return t.mul(t.add(1)).mul(t.add(2)).mul(t.add(3)).div(24);
  // approximations
  } else {
    return (t.add(n).eq(t) ? t.sub(1).pow(n) : productNums(t.sub(1), t.sub(1).add(n))).div(n.factorial())
  }
}
function update(t) {
  let x = new Decimal(_$("_x").value);
  let y = new Decimal(_$("_y").value);
  let n = new Decimal(_$("_n").value).floor();
  let result = multiderviative(x, y, n);
  _$("result").innerHTML = format(result);
  requestAnimationFrame(update);
}
requestAnimationFrame(update)