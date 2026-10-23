const TABS = [["Main"], ["Inventory"], ["Statistics"], ["Options"]];
let currentActiveTab = 0;
function isInTab(name) {
  for (let i of TABS) {
    if (i[0] != name) continue;
    if (i[0] == TABS[currentActiveTab][0]) return true;
  };
  return false;
}
function toTabTitle(str) {
  return str.replace(/ /g, "").toLowerCase();
}
function switchTabs(idx) {
  document.getElementById(`tabbtn-${toTabTitle(TABS[currentActiveTab][0])}`).classList.remove("active");
  document.getElementById(`tab-${toTabTitle(TABS[currentActiveTab][0])}`).classList.remove("shown");
  document.getElementById(`tabbtn-${toTabTitle(TABS[idx][0])}`).classList.add("active");
  document.getElementById(`tab-${toTabTitle(TABS[idx][0])}`).classList.add("shown");
  currentActiveTab = idx;
}
for (let i in TABS) {
  let tabBtn = document.createElement("div");
  tabBtn.id = `tabbtn-${toTabTitle(TABS[i][0])}`;
  tabBtn.innerHTML = `<p>${TABS[i][0]}</p>`;
  tabBtn.addEventListener("click", () => { switchTabs(i) });
  if (i == currentActiveTab) tabBtn.classList.add("active");
  document.getElementsByClassName("tab-select")[0].appendChild(tabBtn);
}