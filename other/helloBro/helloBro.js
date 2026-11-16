let audio = document.getElementById("vineBoom");
setTimeout(() => {
  audio.pause();
	audio.currentTime = 0;
	audio.play();
}, 6000);