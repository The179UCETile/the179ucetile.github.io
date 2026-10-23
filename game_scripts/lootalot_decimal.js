(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.lootalot = {}));
})(this, (function (exports) { 'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
        t && (r = t);
        var n = 0,
          F = function () {};
        return {
          s: F,
          n: function () {
            return n >= r.length ? {
              done: !0
            } : {
              done: !1,
              value: r[n++]
            };
          },
          e: function (r) {
            throw r;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      a = !0,
      u = !1;
    return {
      s: function () {
        t = t.call(r);
      },
      n: function () {
        var r = t.next();
        return a = r.done, r;
      },
      e: function (r) {
        u = !0, o = r;
      },
      f: function () {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  /** The algorithm used to determine if two item entries are equal, used to merge loot results. */
  var DuplicateSearchMode;
  (function (DuplicateSearchMode) {
    /** Items are compared using the loose equal operator (`==`). */
    DuplicateSearchMode["equal"] = "equal";
    /** Items are compared using the strict equal operator (`===`). */
    DuplicateSearchMode["strict_equal"] = "strict_equal";
    /** Items are converted to JSON strings and then compared using the strict equal operator (`===`). */
    DuplicateSearchMode["json"] = "json";
  })(DuplicateSearchMode || (DuplicateSearchMode = {}));
  /** Preferences object. */
  var prefs = {
    /** The maximum allowed precision error of thresholds such as the sum of probabilty values error. */
    ARITHMETIC_ERROR: 1e-8,
    /** The maximum amount of times can we roll the RNG manually (for accuracy)
     *  before it's better to approxmiate the rolling using math (for performance) instead. */
    MAX_REPEAT: 20,
    /** The default value of new loot tables' preferences object  */
    DEFAULT_TABLE_PREFS: {
      duplicateSearchMode: "equal"
    }
  };

  /**
   * Inverse error function
   */
  function erf_inv(x) {
    x = new Decimal(x);
    var a = 0.1400122886866665;
    var b = Decimal.sub(1, x.pow(2)).ln().div(a);
    var c = new Decimal(2 / Math.PI / a).add(Decimal.sub(1, x.pow(2)).ln().div(2));
    return new Decimal(x.sign).mul(Decimal.pow(c, 2).sub(b).sqrt().sub(c).sqrt());
  }
  /**
   * Probit function, or normal distribution quantile function if `μ` and `σ` is set
   */
  function probit(p) {
    var μ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var σ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var sqrt2 = 1.4142135623730951;
    return erf_inv(new Decimal(2).mul(p).sub(1)).mul(sqrt2).mul(σ).add(μ);
  }
  /**
   * Flip `n` weighted coins, with `p` chance of landing on heads, and returns the number of heads.
   * @argument {number} p - Probabilty of landing on heads.
   * @argument {number} n - Amount of coins to flip.
   */
  function coin_flip(n, p) {
    n = new Decimal(n);
    p = new Decimal(p);
    if (p.lte(0)) return new Decimal(0);
    if (p.gte(1)) return new Decimal(n);
    if (n.lt(prefs.MAX_REPEAT)) {
      var successes = 0;
      for (var i = 0; i < n.toNumber(); i++) successes += +(new Decimal(Math.random()).lt(p));
      return new Decimal(successes);
    } else {
      var μ = n.mul(p);
      var σ = μ.mul(Decimal.sub(1, p)).sqrt();
      return clamp(probit(Math.random(), μ, σ), 0, n).round();
    }
  }
  /**
   * Roll `n` dice, with face values ranging from `min` to `max`, and returns the sum of the roll dice's face values.
   * @argument {number} n - Amount of dice to roll.
   * @argument {number} min - The minimum dice value. (inclusive)
   * @argument {number} max - The maximum dice value. (inclusive)
   * @argument {number} step - The distance between dice values.
   */
  function dice_roll(n, min, max) {
    n = new Decimal(n);
    min = new Decimal(min);
    max = new Decimal(max);
    var step = new Decimal(arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1);
    if (min.eq(max)) return min.mul(n);
    if (n.lte(prefs.MAX_REPEAT)) {
      var value = new Decimal(0);
      for (var i = 0; i < n.toNumber(); i++) {
        var roll = new Decimal(Math.random()).mul(max.sub(min).add(step)).add(min);
        if (step.gt(0)) roll = roll.div(step).floor().mul(step);
        value = value.add(roll);
      }
      return value;
    } else {
      var μ = max.add(min).div(2).mul(n);
      var σ = max.sub(min).pow(2).sub(1).div(12).mul(n).sqrt();
      if (step.gt(0)) {
        step = gcd(min, max, step);
        return clamp(probit(Math.random(), μ.div(step), σ.div(step)).round().mul(step), min.mul(n), max.mul(n));
      } else {
        return clamp(probit(Math.random(), μ, σ), min.mul(n), max.mul(n));
      }
    }
  }
  function gcd() {
    for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
      values[_key] = arguments[_key];
    }
    var a = new Decimal(values[0]),
      b = new Decimal(values[1]);
    if (values.length > 2) b = gcd.apply(void 0, _toConsumableArray(values.slice(1)));
    if (a.lt(b)) {
      var _ref = [b, a];
      a = _ref[0];
      b = _ref[1];
    }
    while (a.mod(b).neq(0)) {
      var _ref2 = [b, a.mod(b)];
      a = _ref2[0];
      b = _ref2[1];
    }
    return b;
  }
  function clamp(x, min, max) {
    return new Decimal(x).min(max).max(min);
  }

  /** A loot table, containing the rules used to determine loot drops. */
  var LootTable = /*#__PURE__*/function () {
    function LootTable() {
      _classCallCheck(this, LootTable);
      var _a, _b, _c, _d, _e, _f, _g, _h, _j;
      this.pools = [];
      this.prefs = Object.assign({}, prefs.DEFAULT_TABLE_PREFS);
      this.prefs = Object.assign({}, prefs.DEFAULT_TABLE_PREFS);
      for (var _len = arguments.length, pools = new Array(_len), _key = 0; _key < _len; _key++) {
        pools[_key] = arguments[_key];
      }
      for (var _i = 0, _pools = pools; _i < _pools.length; _i++) {
        var pool = _pools[_i];
        var newPool = [];
        this.pools.push(newPool);
        var wExists = false,
          pExists = false,
          pSum = new Decimal(0),
          wSum = new Decimal(0);
        var _iterator = _createForOfIteratorHelper(pool),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _def = _step.value;
            wExists || (wExists = _def.w !== undefined || _def.p === undefined);
            pExists || (pExists = _def.p !== undefined);
            pSum = pSum.add((_a = _def.p) !== null && _a !== void 0 ? _a : 0);
            wSum = wSum.add((_b = _def.w) !== null && _b !== void 0 ? _b : 1);
            if (wExists && pExists) throw Error("All loot definitions in a pool must either use `p` for probability or `w` for weight");
            if (new Decimal((_c = _def.w) !== null && _c !== void 0 ? _c : 1).lt(0)) throw Error("Weight can not be negative");
            if (new Decimal((_d = _def.p) !== null && _d !== void 0 ? _d : 0).lt(0)) throw Error("Probabilty can not be negative");
            if (new Decimal((_e = _def.step) !== null && _e !== void 0 ? _e : 1).lt(0)) throw Error("Step can not be negative");
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        if (pSum.gt(1 + prefs.ARITHMETIC_ERROR)) throw Error("All loot definitions in a pool must have their `p` values sum to 1 or less (sum = " + pSum + ")");
        if (pExists) wSum = new Decimal(1);
        var _iterator2 = _createForOfIteratorHelper(pool),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _def2 = _step2.value;
            var item = {
              w: new Decimal((_g = (_f = _def2.w) !== null && _f !== void 0 ? _f : _def2.p) !== null && _g !== void 0 ? _g : 1),
              cascadeP: new Decimal(0),
              item: _def2.item,
              table: _def2.table,
              count: (_h = _def2.count) !== null && _h !== void 0 ? _h instanceof Array ? _h.map(a => new Decimal(a)) : new Decimal(_h) : new Decimal(1),
              step: new Decimal((_j = _def2.step) !== null && _j !== void 0 ? _j : getPreferredStepCount(_def2.count))
            };
            // @ts-expect-error
            newPool.push(item);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        if (pExists && pSum.lt(Decimal.sub(1, prefs.ARITHMETIC_ERROR))) {
          newPool.push({
            w: Decimal.sub(1, pSum),
            cascadeP: new Decimal(0),
            count: new Decimal(1),
            step: new Decimal(1)
          });
        }
        // Sort our item list by most common first
        newPool.sort(function (x, y) {
          return Decimal.sub(y.w, x.w).sign;
        });
        // Calculate cascading probability
        for (var _i2 = 0, _newPool = newPool; _i2 < _newPool.length; _i2++) {
          var def = _newPool[_i2];
          def.cascadeP = def.w.div(wSum);
          wSum = wSum.sub(def.w);
        }
        newPool[newPool.length - 1].cascadeP = new Decimal(1);
      }
    }
    /** Loot this loot table.
     * @argument {number} trials - The amount of times will this function loot
    */
    return _createClass(LootTable, [{
      key: "loot",
      value: function loot(trials) {
        trials = new Decimal(trials);
        var _this = this;
        var result = [];
        var dupFunc = function dupFunc(a, b) {
          return _this.isDuplicate.call(_this, a, b);
        };
        function addItem(item, count) {
          var entry = result.find(function (x) {
            return dupFunc(x.item, item);
          });
          if (entry) entry.count = Decimal.add(entry.count, count);else result.push({
            item: item,
            count: new Decimal(count)
          });
        }
        var _iterator3 = _createForOfIteratorHelper(this.pools),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var pool = _step3.value;
            var t = trials;
            var _iterator4 = _createForOfIteratorHelper(pool),
              _step4;
            try {
              var _loop = function _loop() {
                  var item = _step4.value;
                  var times = coin_flip(t, item.cascadeP);
                  if (times.lte(0)) return 0; // continue
                  if (trials.lte("e1e8")) t = t.sub(times);
                  var amount = new Decimal(0);
                  if (!(item.count instanceof Array)) amount = times.mul(item.count);else amount = dice_roll(times, item.count[0], item.count[1], item.step);
                  if (item.table !== undefined) {
                    var childLoot = item.table.loot(amount);
                    if (item.item !== undefined) childLoot = childLoot.map(function (x) {
                      return Object.assign(Object.assign({}, x), {
                        item: Object.assign(Object.assign({}, item.item), x.item)
                      });
                    });
                    var _iterator5 = _createForOfIteratorHelper(childLoot),
                      _step5;
                    try {
                      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                        var _loot = _step5.value;
                        addItem(_loot.item, _loot.count);
                      }
                    } catch (err) {
                      _iterator5.e(err);
                    } finally {
                      _iterator5.f();
                    }
                  } else if (item.item !== undefined) {
                    addItem(item.item, amount);
                  }
                  if (t.lte(0) && trials.lte("e1e8")) return 1; // break
                },
                _ret;
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                _ret = _loop();
                if (_ret === 0) continue;
                if (_ret === 1) break;
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        return result;
      }
    }, {
      key: "isDuplicate",
      value: function isDuplicate(a, b) {
        var pref = this.prefs.duplicateSearchMode;
        switch (pref) {
          case "equal":
            return a == b;
          case "strict_equal":
            return a === b;
          case "json":
            return JSON.stringify(a) == JSON.stringify(b);
        }
      }
    }]);
  }();
  function getPreferredStepCount(count) {
    if (count === undefined) return new Decimal(1);
    if (count instanceof Decimal) return new Decimal(count.mod(1).eq(0));else return new Decimal(Decimal.mod(count[0], 1).eq(0) && Decimal.mod(count[1], 1).eq(0));
  }

  exports.LootTable = LootTable;

  Object.defineProperty(exports, '__esModule', { value: true });

}));