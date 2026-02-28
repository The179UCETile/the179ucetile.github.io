function encodeB64(str) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
  const arr = [];
  let binary = "";
  let output = "";
  for (let i = 0; i < str.length; i++) {
    binary += (str.charCodeAt(i) + 256).toString(2).slice(1)
  };
  if (binary.length % 6 != 0) {
    binary += "0".repeat(6 - binary.length % 6)
  }
  for (let i = 0; i < binary.length / 6; i++) {
    arr[i] = binary.slice(i * 6, i * 6 + 6)
  };
  for (let i in arr) {
    output += alphabet[Number.parseInt(arr[i], 2)]
  }
  return output + (output.length % 4 == 0 ? "" : "=".repeat(4 - output.length % 4))
}
function decodeB64(str) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
  let binary = "";
  let output = "";
  str = str.replace(/=$/g, "");
  for (let i = 0; i < str.length; i++) {
    binary += (alphabet.indexOf(str[i]) + 64).toString(2).slice(1)
  };
  for (let i = 0; i < binary.length / 8; i++) {
    output += String.fromCharCode(Number.parseInt(binary.slice(i * 8, i * 8 + 8), 2))
  };
  return output
}
const windowTitle = document.head.getElementsByTagName("title")[0];
const mainCurrency = document.getElementById("mainCurrency");
const begButton = document.getElementById("beg");
let itemsBegged = 0;
beg.addEventListener("click", function () {
  itemsBegged += 1
})
function update() {
  mainCurrency.innerHTML = `You've begged for ${itemsBegged} items.`
  windowTitle.innerHTML = `py_alt simulator | begged for ${itemsBegged} items`
}
setInterval(update, 20)