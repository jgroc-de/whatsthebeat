import { Audio } from "./audio.js"

export class Tempo {
  constructor (state) {
    this.state = state
    if (!this.state.audio) {
      this.state.audio = new Audio()
    }
    this.interval = null
    this.handleEvent = function(event) {
      this.play()
    }
    this.setNodes()
    this.setEvents()
  }

  setNodes() {
    this.inputs = this.state.nav.sections[1].getElementsByTagName("input")
  }

  setEvents() {
    let btn = document.getElementById("startTempo")

    btn.addEventListener("click", this, false)
  }

  toSecond(tempo) {
    return (60 / tempo)
  }

  setTempo(tempo) {
    if (tempo) {
      this.inputs[2].value = tempo
      this.inputs[2].textContent = tempo
    }
  }

  getTempo() {
    let tempo = this.inputs[2].value

    console.log("tempo")
    if (tempo == 0) {
      return this.toSecond(60)
    }
    
    return this.toSecond(tempo)
  }

  stop() {
    window.clearInterval(this.interval)
    this.interval = null
  }

  setInterval() {
    this.lastTempo = this.tempo
    this.interval = setInterval(function(audio, tempo) {
      audio.loop(tempo)
    },
      this.tempo * 1000,
      this.state.audio,
      this.tempo
    )
  }

  sleep(timeInMs) {
    return new Promise(resolve => setTimeout(resolve, timeInMs))
  }

  async play() {
    this.tempo = this.getTempo()
      console.log(this.tempo)
    if (this.tempo !== this.lastTempo) {
      this.stop()
      this.setInterval()
    } else if (!this.interval) {
      this.state.audio.loop(this.tempo)
      await this.sleep(this.tempo / 2)
      this.setInterval()
    } else {
      this.stop()
      this.state.audio.stop()
    }
  }
}
