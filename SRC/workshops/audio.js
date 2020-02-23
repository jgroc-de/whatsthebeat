export class Audio {
	constructor() {
		this.audioCtx = null
		this.gainNode = null
		this.noises = []
		this.frequency = 0
		this.lastTime = 0
		this.interval = null
		this.pitches = this.setPitchesConstantes()
	}

	setPitchesConstantes() {
		let rConstante = Math.pow(2, 1 / 12)
		let note = 0
		let pitches = []

		while (note < 12) {
			pitches[note] = Math.pow(rConstante, note)
			++note
		}

		return pitches
	}

	first() {
		this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
		this.gainNode = this.audioCtx.createGain()
		this.gainNode.connect(this.audioCtx.destination);

	}

	setNoise(audioCtx, frequency) {
		let noise = audioCtx.createOscillator()
		let filter = this.setFilter(audioCtx)

		noise.frequency.value = frequency
		noise.type = 'square'
		noise.connect(filter).connect(audioCtx.destination)

		return noise
	}

	setFilter(audioCtx) {
		let filter = audioCtx.createBiquadFilter('bandpass')

		filter.Q.value = 0.1

		return filter
	}

	setFrequency(workshops) {
		this.frequency = (
			(
				workshops['pitch'].current * this.pitches[workshops['note'].currentAsNumber]
			) / (
				Math.pow(2, 3 - workshops['octave'].current)
			)
		)
	}

	play(time = 0, continuendo = false) {
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
			if (continuendo) {
				noise.stop(time + 0.1)
				this.lastTime = time
				noise = this.setNoise(this.audioCtx, this.frequency)
				this.noises.push(noise)
			}
		//}

		return this.lastTime
	}

	mute() {
		if (!this.gainNode.gain.value) {
			this.gainNode.gain.linearRampToValueAtTime(1, this.audioCtx.currentTime + 0.1)
		} else {
			this.gainNode.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 0.1)
		}
	}

	async loop(delta) {
		if (!this.audioCtx) {
			await this.start(this.audioCtx)
		}
		if (!this.audioCtx) {
			return
		}
		if (this.lastTime <= this.audioCtx.currentTime - delta / 2) {
			this.play(this.lastTime + delta)
		}
	}

	start(continuendo) {
		if (!this.audioCtx) {
			this.first()
		}
		this.play(0, continuendo)
	}

	reset() {
		window.clearInterval(this.interval)
		this.stop()
	}

	stop() {
		this.noises.length = 0
		this.lastTime = 0
		this.audioCtx.close()
	}

	toggle(continuendo) {
		if (!this.audioCtx) {
			this.start(continuendo)
		} else {
			this.stop()
		}
	}
}
