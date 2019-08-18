import { Audio } from "./audio.js"
import { Frequency } from "./frequency.js"

export class Metronome {
  constructor (state) {
    this.state = state
    if (!this.state.audio) {
      this.state.audio = new Audio()
    }
    this.interval = null
    this.handleEvent = function(event) {
      this.eventDispatcher(event)
    }
    this.setNodes()
    this.setEvents()
    this.frequency = new Frequency()
    this.tempo = 60
  }

  setNodes() {
    this.select = this.state.nav.sections[1].getElementsByTagName("select")[0]
    this.select.addEventListener("change", this, false)
    this.inputs = this.state.nav.sections[1].getElementsByTagName("input")
    for (let input of this.inputs) {
      this.updateInput(input)
      input.addEventListener("change", this, false)
    }
  }

  updateInput(node) {
    if (node.tagName === "INPUT") {
      node.nextSibling.textContent = node.value
    }
  }

  eventDispatcher(event) {
    if (event.type === "change") {
      this.updateInput(event.target)
      if (this.interval) {
        this.stop(false)
        this.setParams()
        this.setInterval()
      }
    } else {
      this.play(event)
    }
  }

  setEvents() {
    this.btn = document.getElementById("startTempo")

    this.btn.addEventListener("click", this, false)
  }

  toSecond(tempo) {
    this.tempo = (60 / tempo)
  }

  setTempo(tempo) {
    if (tempo != 0) {
      this.inputs[2].value = tempo
      this.inputs[2].nextSibling.textContent = tempo
    }
  }

  getTempo() {
    let tempo = this.inputs[2].value

    this.toSecond(tempo)
  }

  stop(end = true) {
    if (this.interval) {
      window.clearInterval(this.interval)
      this.interval = null
      if (end) {
        this.btn.removeAttribute("style")
        this.state.audio.stop()
      }
    }
  }

  setInterval() {
    this.lastTempo = this.tempo
    this.interval = setInterval(function(audio, tempo) {
      audio.loop(tempo)
    },
      100,
      this.state.audio,
      this.tempo
    )
  }

  getNote() {
    let i = 0
    let node = null
    let value = this.select.value

    while (node = this.select.children[i]) {
      if (value === node.value) {
        this.frequency.note = i
        return
      }
      i++
    }
  }

  getFrequency() {
    let octave = this.inputs[0].value
    let pitch = this.inputs[1].value

    this.frequency.pitch = pitch
    this.frequency.octave = octave
  }

  setParams() {
    this.getTempo()
    this.getFrequency()
    this.getNote()
    this.state.audio.setFrequency(this.frequency.getFrequency())
  }

  async play(event) {
    if (!this.interval) {
      this.setParams()
      event.target.setAttribute("style", "border-color:lightGreen")
      this.state.audio.loop(0)
      this.setInterval()
    } else {
      this.stop(true)
    }
  }
}
