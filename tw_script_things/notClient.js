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
          w.chat.send("[CMD] Syntax: /warp <wall>")
        } else {
          w.chat.send(`[CMD] Warping to: /${inputs}`)
          w.goto(inputs)
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
      // /whereIs command
      // shows someone's position
      case "/whereis": {
        if (inputs == "") {
          w.chat.send("[CMD] Syntax: /whereIs <username> (case sensitive)")
        } else {
          let userInWall = false;
          let userId = 0;
          for (let i in cursors) {
            if (cursors[i].n == inputs) {
              userInWall = true;
              userId = i
            }
          };
          if (userInWall) {
            w.chat.send(`[CMD] ${inputs} is at ${cursors[userId].l[0]}, ${-cursors[userId].l[1]}`)
          } else {
            w.chat.send(`[CMD] ${inputs} is not in this wall!`)
          }
        }
      }; break;
      // /whereIsId command
      // shows an id's position
      case "/whereIsId": {
        if (inputs == "") {
          w.chat.send("[CMD] Syntax: /whereIsId <userId>")
        } else {
          let userInWall = false;
          for (let i in cursors) {
            if (i == inputs) {
              userInWall = true
            }
          };
          if (userInWall) {
            w.chat.send(`[CMD] ID ${inputs} is at ${cursors[inputs].l[0]}, ${-cursors[inputs].l[1]}`)
          } else {
            w.chat.send(`[CMD] ID ${inputs} is not in this wall!`)
          }
        }
      }; break;
    }
  }
})