fetch("data.txt")
.then(x => x.text())
.then(doTheThing)
function doTheThing(d) {
  class Info {
    constructor(name, style) {
      this.name = name;
      this.style = style;
    }
  }
  const data = {};
  const styles = {
    0: new Info("Not confusing at all", "color: #0c0"),
    1: new Info("Not confusing", "color: #4c0"),
    10: new Info("Slightly confusing", "color: #dd0"),
    25: new Info("Confusing", "color: #e90; text-shadow: 0 0 3px #e904"),
    50: new Info("Very confusing", "color: #f00; text-shadow: 0 0 3px #f008"),
    100: new Info("Really confusing", "color: #f0f; text-shadow: 0 0 2px #f0fc"),
    250: new Info("Insanely confusing", "color: #00f; text-shadow: 1px 0 0 #fff, 0 1px 0 #fff, -1px 0 0 #fff, 0 -1px 0 #fff, 0 0 2px #00f"),
    500: new Info("Extremely confusing", "color: #08f; text-shadow: 0 0 1px #08f"),
    1000: new Info("Catastrophically confusing", "color: #0ff; text-shadow: 0 0 1px #0ff"),
    1500: new Info("Uber confusing", "color: #fff; text-shadow: 0 0 1px #fff"),
    2000: new Info("Most likely dead by now", "color: #888; text-shadow: 0 0 1px #888")
  };
  d = d.split("\n");
  for (let i of d) {
    data[i.split(" ")[0]] = Number(i.split(" ")[1])
  };
  function round(x) {
    const arr = styles.keys();
    for (let i in arr) {
      if (arr[i] > x) return arr[i - 1] ?? 0
    }
  }
  setInterval(()=>{
    const val = document.getElementById("users").value;
    document.getElementById("output").style = styles[round(val)].style;
    document.getElementById("output").innerHTML = `${styles[round(val)].name} (Confusol: ${val})`
  }, 16)
}