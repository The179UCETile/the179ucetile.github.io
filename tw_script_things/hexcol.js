// by the179ucetile
function hexToRGB(str) {
  const arr = [];
  for (let i = 0; i < 3; i++) {
    arr.push(parseInt(str.slice(i * 2, i * 2 + 2), 16))
  };
  return arr;
}
let cc = document.getElementById("customcolour");
let i = document.createElement("input");
i.type = "text";
i.style.height = "100%";
i.style.width = "25%";
document.getElementById("colourcontainer").appendChild(i);
i.addEventListener("input", () => {
  i.value = i.value.toUpperCase();
  if (!(i.value.length == 6 || /[0-9a-f]/g.test(i.value))) return;
  w.changeColor(hexToRGB(i.value));
  cc.setAttribute("data-current-color", `#${i.value}`);
});
i.value = cc.getAttribute("data-current-color").slice(1)
