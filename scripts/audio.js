export class Audio {
  constructor() {
    this.audioCtx = null
    this.noises = []
    this.params = {
      frequency: 442,
    }
    this.lastTime = 0
  }

  setFrequency (frequency) {
    this.params.frequency = frequency
  }

  setAudioContext() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  setNoise() {
    let noise = this.audioCtx.createOscillator()

    noise.frequency.value = this.params.frequency
    noise.type = "square"
    noise
      .connect(this.setFilter())
      .connect(this.audioCtx.destination)
    this.noises.push(noise)
  }

  setFilter() {
    let filter = this.audioCtx.createBiquadFilter("bandpass")

    filter.Q.value = 0.1
    return filter
  }

  stop() {
    if (this.noise) {
      this.noise.stop(this.audioCtx.currentTime + 0)
    }
  }

  play(time = 0) {
    if (this.noises.length === 0) {
      this.setNoise()
    }
    let noise = this.noises.shift()
      
    if (!time) {
      time = this.audioCtx.currentTime
      this.lastTime = time
    }
    noise.start(time)
    noise.stop(time + 0.1)
    this.lastTime = time
    this.setNoise()
  }

  async loop(delta) {
    if (!this.audioCtx) {
      await this.start()
    }
    if (this.lastTime <= this.audioCtx.currentTime - (delta / 2)) {
      console.log(delta)
      this.play(this.lastTime + delta)
    }
  }

  async start() {
    await this.setAudioContext()
    this.setNoise()
  }

  stop() {
    this.audioCtx = null
    this.noises.length = 0
    this.lastTime = 0
  }
}
