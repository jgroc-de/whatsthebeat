export class Audio {
  constructor(ctx = false) {
    this.audioCtx = null
    this.max = 0
    if (ctx) {
      this.setAudioContext()
    }
    this.noises = []
    this.params = {
      frequency: 442,
    }
    this.lastTime = 0
  }

  setFrequency (frequency) {
    this.params.frequency = frequency
  }

  getMax(data) {
    let i = 1
    let max = 0
    let value = 0
    let tmp = 0

    while (data[i]) {
      tmp = Math.abs(data[i] - 128)
      if (tmp > value) {
        value = tmp
        max = i
      }
      i++
    }
    if (value > 30) {
      this.value = value
      this.max = max
    }
    return this.max
  }

  printData() {
    this.analyser.getByteTimeDomainData(this.dataArray);

    return this.getMax(this.dataArray)
  }

  setMediaSource(stream) {
    this.noise = this.audioCtx.createMediaStreamSource(stream)
    let analyser = this.audioCtx.createAnalyser()
    analyser.fftSize = 2048
    analyser.minDecibels = -90
    analyser.maxDecibels = -10
    analyser.smoothingTimeConstant = 0.95
    this.noise
      .connect(analyser)
    this.dataArray = new Uint8Array(2048)
    this.analyser = analyser
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

  removeSound() {
    if (this.noise) {
      this.noise.stop(this.audioCtx.currentTime + 0)
    }
  }

  play(time = 0, stop = true) {
    if (this.noises.length === 0) {
      this.setNoise()
    }
    let noise = this.noises.shift()
      
    if (!time) {
      time = this.audioCtx.currentTime
      this.lastTime = time
    }
    noise.start(time)
    if (stop) {
      noise.stop(time + 0.1)
      this.lastTime = time
      this.setNoise()
    } else {
      this.noises.push(noise)
    }
  }

  async startSound() {
    if (!this.audioCtx) {
      await this.start()
    }
    this.play(0, false)
  }

  stopSound() { 
    let noise = this.noises.shift()
    let time = this.audioCtx.currentTime
    
    noise.stop(time + 0.01)
    this.setNoise()
  }

  async loop(delta) {
    if (!this.audioCtx) {
      await this.start()
    }
    if (this.lastTime <= this.audioCtx.currentTime - (delta / 2)) {
      this.play(this.lastTime + delta)
    }
  }

  async start() {
    await this.setAudioContext()
    //there is always a node ready to use in the array
    this.setNoise()
  }

  stop() {
    this.audioCtx = null
    this.noises.length = 0
    this.lastTime = 0
  }
}
