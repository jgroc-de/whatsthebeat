'use strict'

let wtb = {
  beatOut: document.getElementById("beat").getElementsByTagName("span")[0],
  lastBeat: document.getElementById("lastBeat").getElementsByTagName("span")[0],
  count: -1,
  timeStart: 0,
  lastDelta: 1000000000000,
  mute: true,
  nav: document.getElementsByTagName("nav")[0],
  audio: null,
}


function setGain() {
  let gain = wtb.audio.createGain()

  gain.gain.exponentialRampToValueAtTime(
    0.01,
    wtb.audio.currentTime + 0.3
  )
  return gain
}

function setNoise(noise) {
  noise.frequency.value = 442
  noise.type = "square"

  return noise
}

function setFilter() {
  let filter = wtb.audio.createBiquadFilter("bandpass")

  filter.Q.value = 0.1
  return filter
}

async function play() {
  const noise = wtb.audio.createOscillator()

  setNoise(noise)
  noise
    .connect(setGain())
    .connect(setFilter())
    .connect(wtb.audio.destination)
  noise.start()
  noise.stop(wtb.audio.currentTime + 0.1)
}

function reset(event) {
  wtb.count = -1
  wtb.timeStart = 0
  wtb.lastDelta = 1000000000000
  wtb.beatOut.textContent = 0
  if (event) {
      wtb.lastBeat.textContent = 0
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function toggleHide() {
  wtb.nav.toggleAttribute("hidden")
}

function setEvent(node) {
  node.addEventListener("click", toggleHide, false)
}

async function count() {
  if (wtb.count < 0) {
    wtb.timeStart = new Date().getTime()
    wtb.count += 1
  } else {
    let delta = (new Date().getTime() - wtb.timeStart)
    wtb.count += 1
    let count = wtb.count + 1
    let beat = Math.floor(60000 * wtb.count / delta)

    wtb.beatOut.textContent = beat
    await sleep((delta * 5) / count)
    if (count === wtb.count + 1) {
      wtb.lastBeat.textContent = beat
      reset()
    }
  }
}

function setBurger() {
  let burger = document.getElementById("burger")
  let nav = document.getElementsByTagName("nav")[0]

  setEvent(burger)
  setEvent(nav.firstElementChild)
}

function tap() {
  count()
  if (!wtb.mute) {
    play()
  }
}

function toggleSound(event) {
  if (!wtb.audio) {
    wtb.audio = new window.AudioContext()
  }
  wtb.mute = !wtb.mute
  event.target.classList.toggle("gg-on")
}

function init() {
  let resetButton = document.getElementById("reset")
  let tapButton = document.getElementById("tap")
  let soundButton = document.getElementById("sound")

  tapButton.addEventListener("mousedown", tap, false)
  setBurger()
  resetButton.addEventListener("click", reset, false)
  soundButton.addEventListener("click", toggleSound, false)
}

init()
