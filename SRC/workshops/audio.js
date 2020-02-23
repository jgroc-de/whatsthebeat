export class Audio {
	constructor() {
		this.audioCtx = null
		this.max = 0
		this.value = 0
		this.setAudioContext()
		this.noises = []
		this.frequency = 0
		this.lastTime = 0
		this.analyser = null
		this.noise = null
		this.interval = null
		this.pitches = []
		this.isMuted = true
		this.isStopped = true

		let rConstante = Math.pow(2, 1 / 12)
		let note = 0
		while (note < 12) {
			this.pitches[note] = Math.pow(rConstante, note)
			++note
		}
	}

	getFrequency(pitch, note, octave) {
		return (pitch * this.pitches[note]) / Math.pow(2, 3 - octave)
	}

	setMax(data) {
		let i = 1
		let max = 0
		let value = 0
		let dataAbsoluteValue = 0

		while (data[i]) {
			dataAbsoluteValue = Math.abs(data[i] - 128)
			if (dataAbsoluteValue > value) {
				value = dataAbsoluteValue
				max = i
			}
			i++
		}
		if (value > 30) {
			this.value = value
			this.max = max
		}
	}

	mute() {
		if (!this.isMuted) {
			this.stop()
		} else {
			this.play(0, this.isStopped)
		}
		this.isMuted = !this.isMuted
	}

	printData() {
		this.analyser.getByteTimeDomainData(this.dataArray)
		this.setMax(this.dataArray)

		return this.max
	}

	setMediaSource(stream) {
		let noise = this.audioCtx.createMediaStreamSource(stream)
		let analyser = this.audioCtx.createAnalyser()

		analyser.fftSize = 2048
		analyser.minDecibels = -90
		analyser.maxDecibels = -10
		analyser.smoothingTimeConstant = 0.95
		noise.connect(analyser)

		this.dataArray = new Uint8Array(2048)
		this.noise = noise
		this.analyser = analyser
	}

	setAudioContext() {
		return (this.audioCtx = new (window.AudioContext ||
			window.webkitAudioContext)())
	}

	setNoise(audioCtx, frequency) {
		let noise = audioCtx.createOscillator()

		noise.frequency.value = frequency
		noise.type = 'square'
		noise.connect(this.setFilter(audioCtx)).connect(audioCtx.destination)

		return noise
	}

	setFilter(audioCtx) {
		let filter = audioCtx.createBiquadFilter('bandpass')

		filter.Q.value = 0.1

		return filter
	}

	setFrequency(workshops) {
		let frequency = this.getFrequency(
			workshops['pitch'].current,
			workshops['note'].currentAsNumber,
			workshops['octave'].current
		)
		this.frequency = frequency
	}

	play(time = 0, stop = true) {
		console.log(this.audioCtx)
		if (!this.audioCtx) {
			return
		}
		if (this.noises.length === 0) {
			this.noises.push(this.setNoise(this.audioCtx, this.frequency))
		}

		if (!time) {
			time = this.audioCtx.currentTime
			this.lastTime = time
		}
		//if (!this.isMuted) {
			let noise = this.noises.shift()
			noise.start(time)
			//console.log(noise)
			if (stop) {
				noise.stop(time + 0.1)
				this.lastTime = time
				noise = this.setNoise(this.audioCtx, this.frequency)
			}
			this.noises.push(noise)
		//}

		return this.lastTime
	}

	removeSound() {
		if (this.noise) {
			this.noise.stop(this.audioCtx.currentTime + 0)
		}
	}

	async startSound() {
		if (!this.audioCtx) {
			await this.start(this.audioCtx)
		}
		this.play(0, false)
	}

	stopSound() {
		let noise = this.noises.shift()

		noise.stop(this.audioCtx.currentTime + 0.01)
	}

	async loop(delta) {
		if (!this.audioCtx) {
			await this.start(this.audioCtx)
		}
		if (this.lastTime <= this.audioCtx.currentTime - delta / 2) {
			this.play(this.lastTime + delta)
		}
	}

	async start() {
		if (!this.audioCtx) {
			await this.setAudioContext()
		}
		//there is always a node ready to use in the array
		this.setNoise(this.audioCtx, this.frequency)
		this.play(0, this.isStopped)
	}

	reset() {
		window.clearInterval(this.interval)
		this.stop()
	}

	stop() {
		this.audioCtx = null
		this.noises.length = 0
		this.lastTime = 0
	}
}
