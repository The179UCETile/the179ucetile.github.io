// by The179UCETile
// function to get the command name
function getCmd(string) {
  return string.split(" ")[0]
}
// function to get the command's inputs
function getImpArr(string) {
  return string.split(" ").slice(1)
}
function getImp(string) {
  return getImpArr(string).join(" ")
}
w.on("msg", (d)=>{
  // check if w.cursors doesn't contain the client's name
  const cursors = Object.fromEntries(w.cursors);
  let isSentByClient = true;
  for (let i in cursors) {
    if (cursors[i].n == d.nick) {
      isSentByClient = false
    }
  };
  if (isSentByClient) {
    const inputsArr = getImpArr(d.msg);
    const inputs = getImp(d.msg);
    switch (getCmd(d.msg).toLowerCase()) {
      // /warp command
      // teleports the client to a wall
      case "/warp": {
        if (inputs == "") {
          w.chat.send("[CMD] Syntax: /warp <wall> <subwall, optional>")
        } else {
          if (inputsArr[1]) {
            w.chat.send(`[CMD] Warping to: /${inputsArr[0]}/${inputsArr[1]}`)
            w.goto(inputsArr[0], inputsArr[1])
          } else {
            w.chat.send(`[CMD] Warping to: /${inputs}`)
            w.goto(inputs)
          };
        }
      }; break;
      // /tp command
      // teleports the client to a specified position
      case "/tp": {
        if (inputs == "" || inputsArr.length < 2) {
          w.chat.send("[CMD] Syntax: /tp <x> <y>")
        } else {
          w.chat.send(`[CMD] Teleporting to ${inputsArr[0]}, ${inputsArr[1]}`);
          w.tp(Number(inputsArr[0]), -Number(inputsArr[1]))
        }
      }; break;
      // /users command
      // shows all users
      case "/users": {
        const arr = [];
        for (let i in cursors) {
          if (cursors[i].n == "") {
            arr.push(cursors[i].id)
          } else {
            arr.push(cursors[i].n)
          }
        };
        w.chat.send(`[CMD] Users: ${arr.join(", ")}`)
      }; break;
      // /changeTheme command
      // changes custom theme
      case "/changetheme": {
        if (inputs == "" || inputsArr.length < 2) {
          w.chat.send("[CMD] Syntax: /changeTheme <primaryColor> <secondaryColor>")
        } else {
          w.changeTheme(2);
          w.setPrimaryColor(inputsArr[0]);
          w.setSecondaryColor(inputsArr[1]);
          w.chat.send("[CMD] Changed theme.")
        }
      }; break;
      // /useCustomCSS command
      // changes the page's CSS
      case "/usecustomcss": {
        let h = document.getElementsByTagName("*");
        let stylesheetPos = 0;
        for (let i in h) {
          if (h[i].href == "https://tw.2s4.me/static/textwall.css") {
            stylesheetPos = i;
          }
        };
        h[stylesheetPos].href = "https://the179ucetile.github.io/textwall.css";
        w.chat.send("[CMD] Changed page CSS.")
      }; break;
    }
  }
})