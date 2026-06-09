# tw.2s4.me themes
To apply a theme, run the following script in the console:
```js
for (let i of document.getElementsByTagName("*")) {
  if (i.href == "https://tw.2s4.me/static/textwall.css") {
    i.href = "https://the179ucetile.github.io/tw_css/<THEME>.css";
  }
}
```
where <THEME> is the name of any file in this folder.
