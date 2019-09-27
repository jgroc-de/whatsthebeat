import { Audio } from "./audio.js"
import { Frequency } from "./frequency.js"

export class Tuner {
  constructor(state) {
    this.state = state
    this.buildView()
    this.handleEvent = function(event) {
      this.setAudioON()
    }
    this.setEvents()
  }

  buildView() {
    let template = this.state.document.getElementById('tuner')
    let node = this.state.document.importNode(template.content, true)
    this.state.main.appendChild(node)
  }

  setEvents() {
    this.btn = this.state.document.getElementById("startTuner")
    this.btn.addEventListener("click", this, false)
  }

  async setAudioObject() {
    if (!this.state.audio) {
      this.state.audio = await new Audio(true)
      return 
    } else {
      this.state.audio.setAudioContext()
    }
  }

  openMic() {
    let audio = this.state.audio

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream) {
        audio.setMediaSource(stream)
      }).catch(function(err) {
        console.log(err)
      });
    }
    this.mic = true
  }

  setAudioON() {
    if (this.interval) {
      this.state.window.clearInterval(this.interval)
      this.state.audio.stop()
    } else {
      this.setAudioObject()
      if (!this.mic) {
        this.openMic()
      }
      this.interval = setInterval(function(audio, btn) {
        let max = audio.printData()
        btn.textContent = max
      },
        100,
        this.state.audio,
        this.btn
      )
    }
  }
}
