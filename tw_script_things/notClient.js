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
// w.chat.send() but it only shows on the client
function send(string) {
  var p = document.createElement('p');
  p.style.opacity = "1";
  p.style.transition = "opacity 0.5s";
  p.innerHTML = `<span style="color:#3690EA">[CLIENT]</span> ~ ${string}`;
  document.getElementById("chatbox").appendChild(p);
}
// haha no
const thisIsAObfuscatedRegExp = eval(unescape(escape`⽜砶敜砶㥜砶㝜砶㝜砶ㅼ屸㙥屸㘹屸㘷屸㘷屸㘵屸㜲⽩`.replace(/u(..)/g,"$1%")));
w.on("chatBefore", (d)=>{
  // prevent racical slurs
  if (thisIsAObfuscatedRegExp.test(d.msg)) {
    send("Get out.");
    d.msg = "[Censored because message contains racical slurs]";
  }
  const cursors = Object.fromEntries(w.cursors);
  if (d.msg.startsWith("/")) {
    const inputsArr = getImpArr(d.msg);
    const inputs = getImp(d.msg);
    switch (getCmd(d.msg).toLowerCase()) {
      // /help command
      // duh.
      case "/help": {
        send("Commands: <br>/help - Shows this text.<br>/warp - Teleports you to a wall.<br>/tp - Teleports you to a specified position.<br>/users - Shows all users.<br>/changeTheme - Changes the theme.<br>/useCustomCSS - Changes the page CSS.<br>/whereIs - Shows someone's position.<br>/whereIsId - Shows an ID's position.")
      }; break;
      // /warp command
      // teleports the client to a wall
      case "/warp": {
        if (inputs == "") {
          send("Syntax: /warp <wall>")
        } else {
          send(`Warping to: /${inputs}`)
          w.goto(inputs)
        }
      }; break;
      // /tp command
      // teleports the client to a specified position
      case "/tp": {
        if (inputs == "" || inputsArr.length < 2) {
          send("Syntax: /tp <x> <y>")
        } else {
          send(`Teleporting to ${inputsArr[0]}, ${inputsArr[1]}`);
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
        send(`Users: ${arr.join(", ")}`)
      }; break;
      // /changeTheme command
      // changes custom theme
      case "/changetheme": {
        if (inputs == "" || inputsArr.length < 2) {
          send("Syntax: /changeTheme <primaryColor> <secondaryColor>")
        } else {
          w.changeTheme(2);
          w.setPrimaryColor(inputsArr[0]);
          w.setSecondaryColor(inputsArr[1]);
          send("Changed theme.")
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
        send("Changed page CSS.")
      }; break;
      // /whereIs command
      // shows someone's position
      case "/whereis": {
        if (inputs == "") {
          send("Syntax: /whereIs <username> (case sensitive)")
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
            send(`${inputs} is at ${cursors[userId].l[0]}, ${-cursors[userId].l[1]}`)
          } else {
            send(`${inputs} is not in this wall!`)
          }
        }
      }; break;
      // /whereIsId command
      // shows an id's position
      case "/whereisid": {
        if (inputs == "") {
          send("Syntax: /whereIsId <userId>")
        } else {
          let userInWall = false;
          for (let i in cursors) {
            if (i == inputs) {
              userInWall = true
            }
          };
          if (userInWall) {
            send(`ID ${inputs} is at ${cursors[inputs].l[0]}, ${-cursors[inputs].l[1]}`)
          } else {
            send(`ID ${inputs} is not in this wall!`)
          }
        }
      }; break;
    };
    d.msg = "";
  }
})