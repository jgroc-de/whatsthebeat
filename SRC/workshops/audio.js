export class Audio {
	constructor() {
		this.audioCtx = null
		this.gainNode = null
		this.noises = []
		this.frequency = 0
		this.lastTime = 0
		this.interval = null
		this.pitches = this.setPitchesConstantes()
		this.isMuted = false
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

	getNoiseNode(audioCtx, frequency) {
		let noise = new OscillatorNode(audioCtx, {frequency: frequency, type: 'sine'}) //could be square
		let filter = this.setFilter(audioCtx)
		let gainNode = this.setGainNode(audioCtx, this.isMuted)
		noise.connect(filter).connect(gainNode).connect(audioCtx.destination)

		return noise
	}

	setGainNode(audioCtx, isMuted) {
		let gainNode = audioCtx.createGain()

		if (isMuted) {
			gainNode.gain.value = 0
		}
		this.gainNode = gainNode

		return gainNode
	}

	setFilter(audioCtx) {
		let filter = audioCtx.createBiquadFilter('bandpass')

		filter.Q.value = 0.1

		return filter
	}

	setFrequencyAndTempo(workshops) {
		this.frequency = (
			(
				workshops['pitch'].current * this.pitches[workshops['note'].currentValueAsNumber]
			) / (
				Math.pow(2, 3 - workshops['octave'].current)
			)
		)
		this.tempo = workshops['tempo'].current
	}

	play(frequency, time = 0, continuendo = false) {
		if (this.noises.length === 0) {
			this.noises.push(this.getNoiseNode(this.audioCtx, frequency))
		}
		if (!time) {
			time = this.audioCtx.currentTime
		}
		this.lastTime = time
		let noise = this.noises.shift()
		noise.start(time)
		if (!continuendo) {
			noise.stop(time + 0.1)
			this.noises.push(this.getNoiseNode(this.audioCtx, frequency))
		}
	}

	async mute() {
		if (this.gainNode) {
			if (!this.gainNode.gain.value) {
				this.gainNode.gain.linearRampToValueAtTime(1, this.audioCtx.currentTime)
			} else {
				this.gainNode.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime)
			}
		}
		this.isMuted = !this.isMuted
	}

	async loop(tempo) {
		if (!this.audioCtx) {
			await this.start(true)
		}
		this.tempo = tempo
		if (!this.interval) {
			console.log('loop')

			//à mettre dans l'objet audio
			this.interval = setInterval(
				function(audio) {
					let delta = 60 / audio.tempo
					if (audio.lastTime + 3 * delta / 4 <= audio.audioCtx.currentTime) {
						audio.play(audio.frequency, audio.lastTime + delta, false)
					}
				},
				30 / this.tempo,
				this
			)
		} else {
			this.stop()
		}
	}

	async start(autoStop) {
		if (!this.audioCtx) {
			this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
		}
		this.play(this.frequency, 0, false)
	}

	async reset() {
		this.stop()
	}

	async stop() {
		if (this.interval) {
			window.clearInterval(this.interval)
			this.interval = null
		}
		this.noises.length = 0
		this.lastTime = 0
		if (this.gainNode) {
			this.gainNode.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 0.2)
			this.gainNode = null
		}
		if (this.audioCtx) {
			this.audioCtx.close()
			this.audioCtx = null
		}
	}

	async toggle(continuendo) {
		if (!this.audioCtx || this.audioCtx.state !== 'running') {
			this.start(continuendo)
		} else {
			this.stop()
		}
	}
}
