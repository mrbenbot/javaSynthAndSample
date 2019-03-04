var oscType = "sine";

function waveChange(type) {
  oscType = type;
  document.getElementById("waveText").innerHTML = type;
}

function startNoise(freq) {
  // create web audio api context
  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  // create Oscillator node
  var oscillator = audioCtx.createOscillator();

  oscillator.type = oscType;
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime); // value in hertz
  oscillator.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.1);
}

function checkKey(e) {
  console.log(e);
  e = e || window.event;
  if (e.keyCode == "65") {
    startNoise(440);
  } else if (e.keyCode == "83") {
    startNoise(493.88);
  } else if (e.keyCode == "68") {
    startNoise(554.37);
  } else if (e.keyCode == "70") {
    startNoise(587.33);
  } else if (e.keyCode == "71") {
    startNoise(659.25);
  } else if (e.keyCode == "72") {
    startNoise(739.99);
  } else if (e.keyCode == "74") {
    startNoise(830.61);
  } else if (e.keyCode == "75") {
    startNoise(880, e.keyCode);
  }
  if (e.keyCode == "49") {
    waveChange(`sine`);
  }
  if (e.keyCode == "50") {
    waveChange(`square`);
  }
  if (e.keyCode == "51") {
    waveChange(`sawtooth`);
  }
  if (e.keyCode == "52") {
    waveChange(`triangle`);
  }
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  key.classList.add("playing");
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  e.target.classList.remove("playing");
}

const keys = Array.from(document.querySelectorAll(".key"));
keys.forEach(key => key.addEventListener("transitionend", removeTransition));

window.onkeydown = checkKey;
