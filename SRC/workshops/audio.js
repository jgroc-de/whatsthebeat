export class AudioInterface {
	constructor() {
		this.sound = new SoundGenerator()
	}

	setAudioParams(workshops) {
		this.sound.setFrequency(workshops.note, workshops.pitch, workshops.octave)
		this.sound.setTempo(workshops.tempo)
		this.sound.setWaveForm(workshops.waveForm)

		return this.sound.isPlaying()
	}

	mute() {
		this.sound.mute()
	}

	start(continuendo = false) {
		this.sound.init()
		if (continuendo) {
			this.sound.toggle()
		} else {
			this.sound.loop()
		}
	}

	reset() {
		this.sound.reset()
	}

	stop() {
		this.sound.stop()
	}
}

class SoundGenerator {
	constructor() {
		this.lastTime = 0
		this.interval = null
		this.audioCtx = null
		this.gainNode = null
		this.noise = null
		this.isMuted = false
		this.waveForm = null
		this.frequency = 0
		this.pitches = this.setPitchesConstantes()
	}

	reset() {
		this.stop()
		this.isMuted = false
		this.waveForm = null
		this.frequency = 0
	}

	isPlaying() {
		if (this.audioCtx) {
			return this.noise !== null
		}

		return false
	}

	init() {
		if (!this.audioCtx) {
			this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
		}
	}

	mute() {
		if (this.gainNode) {
			if (this.gainNode.gain.value == 0) {
				this.gainNode.gain.linearRampToValueAtTime(1, this.audioCtx.currentTime)
			} else {
				this.gainNode.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime)
			}
		}
		this.isMuted = !this.isMuted
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

	setFrequency(note, pitch, octave) {
		this.frequency =
			(pitch.current * this.pitches[note.currentValueAsNumber]) /
			Math.pow(2, 3 - octave.current)
	}

	setWaveForm(waveForm) {
		this.waveForm = waveForm.current
	}

	setTempo(tempo) {
		this.tempo = tempo.current
	}

	stop() {
		if (this.interval) {
			window.clearInterval(this.interval)
			this.interval = null
		}
		this.stopNoise()
		this.lastTime = 0
		if (this.gainNode) {
			this.gainNode.gain.linearRampToValueAtTime(
				0,
				this.audioCtx.currentTime + 0.2
			)
			this.gainNode = null
		}
		if (this.audioCtx) {
			this.audioCtx.close()
			this.audioCtx = null
		}
	}

	setNoiseNode() {
		let filter = this.setFilter(this.audioCtx)
		let gainNode = this.setGainNode(this.audioCtx, this.isMuted)

		this.noise = new OscillatorNode(this.audioCtx, {
			frequency: this.frequency,
			type: this.waveForm,
		})
		this.noise
			.connect(filter)
			.connect(gainNode)
			.connect(this.audioCtx.destination)
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

	stopNoise(time) {
		if (this.noise) {
			this.noise.stop(time)
			this.noise = null
		}
	}

	startNoise(time) {
		this.noise.start(time)
	}

	toggle() {
		if (this.noise) {
			this.stopNoise()
		} else {
			this.loop(true)
		}
	}

	loop(continuendo = false) {
		if (!continuendo || this.tempo === 0) {
			this.play(0, continuendo)
		} else {
			if (!this.interval) {
				console.log('loop')
				let that = this

				this.interval = setInterval(
					function(sound) {
						console.log(sound)
						let delta = 60 / sound.tempo

						if (
							sound.lastTime + (3 * delta) / 4 <=
							sound.audioCtx.currentTime
						) {
							sound.play(sound.lastTime + delta, false)
						}
					},
					30000 / this.tempo,
					this
				)
			} else {
				this.stop()
			}
		}
	}

	play(time = 0, continuendo = false) {
		this.stopNoise()
		this.setNoiseNode()
		if (!time) {
			time = this.audioCtx.currentTime
		}
		this.lastTime = time
		this.startNoise(time)
		if (!continuendo) {
			this.stopNoise(time + 0.1)
		}
	}
}
