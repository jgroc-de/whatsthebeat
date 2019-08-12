'use strict'

let wtb = {
  tapButton: document.getElementById("tap"),
  beatOut: document.getElementById("beat").firstChild,
  lastBeat: document.getElementById("lastBeat").firstChild,
  count: -1,
  timeStart: 0,
  lastDelta: 1000000000000,
}

function reset() {
  wtb.count = -1
  wtb.timeStart = 0
  wtb.lastDelta = 1000000000000
  wtb.beatOut.textContent = 0
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
    if (count === wtb.count) {
      reset()
      wtb.lastBeat.textContent = beat
    }
  }
}

function init() {
  wtb.tapButton.addEventListener("click", count, false)
}

init();
