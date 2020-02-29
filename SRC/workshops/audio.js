export class AudioInterface {
	constructor() {
		this.lastTime = 0
		this.interval = null
		this.audioCtx = null
		this.gainNode = null
		this.filterNode = null
		this.noise = null
		this.isMuted = false
		this.waveForm = null
		this.frequency = 0
		this.tempo = 0
		this.pitches = this.setPitchesConstantes()
		this.isPlaying = false
	}

	setAudioParams(workshops) {
		this.setFrequency(workshops.note, workshops.pitch, workshops.octave)
		this.setTempo(workshops.tempo)
		this.setWaveForm(workshops.waveForm)

		return this.isPlaying
	}

	reset() {
		this.stop()
		this.isMuted = false
		this.waveForm = null
		this.frequency = 0
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
		this.lastTime = 0
		if (this.noise) {
			this.noise.disconnect()
		}
		if (this.gainNode) {
			this.gainNode.disconnect()
		}
		if (this.filterNode) {
			this.filterNode.disconnect()
		}
		this.noise = null
		this.gainNode = null
		this.filterNode = null
		this.isPlaying = false
		if (this.nodeToDisconnect) {
			this.nodeToDisconnect.disconnect()
			this.nodeToDisconnect = null
		}
		this.audioCtx = null
	}

	setNoiseNode(noise) {
		let gainNode = this.setGainNode(this.audioCtx, this.gainNode, this.isMuted)
		if (!noise) {
			let filter = this.setFilter(this.audioCtx, this.filterNode)
			noise = new OscillatorNode(this.audioCtx, {
				frequency: this.frequency,
				type: this.waveForm,
			})
			noise
				.connect(filter)
				.connect(gainNode)
				.connect(this.audioCtx.destination)
			this.noise = noise

			return true
		}
		noise.frequency.value = this.frequency;
		noise.type = this.waveForm;
		
		return false
	
	}

	setGainNode(audioCtx, gainNode, isMuted) {
		if (!gainNode) {
			gainNode = audioCtx.createGain()
			this.gainNode = gainNode
		}

		if (isMuted) {
			gainNode.gain.value = 0
		} else {
			gainNode.gain.value = 1
		}

		return gainNode
	}

	setFilter(audioCtx, filterNode) {
		if (!filterNode) {
			filterNode = audioCtx.createBiquadFilter('bandpass')

			filterNode.Q.value = 0.1

			this.filterNode = filterNode
		}

		return this.filterNode
	}

	start(shouldPlay = true) {
		if (!this.audioCtx) {
			this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
		}
		if (shouldPlay) {
			if (this.tempo === 0) {
				this.play()
			} else {
				this.toggle(this.tempo, this.interval)
			}
		} else {
			if (this.interval) {
				window.clearTimeout(this.interval)
			}
			this.interval = setTimeout(
				function(sound) {
					sound.reset()
				},
				2500,
				this
			)
		}
		
	}

	toggle(tempo, interval) {
		if (!interval) {
			this.isPlaying = true
			this.setNoiseNode()
			this.interval = setInterval(
				function(sound) {
					let delta = 60 / sound.tempo

					if (
						sound.lastTime + delta / 2 <=
						sound.audioCtx.currentTime
					) {
						sound.repeat(sound.lastTime + delta)
					}
				},
				30000 / 240,
				this
			)
		} else {
			this.stop()
		}
	}

	repeat(time) {
		this.lastTime = time
		this.noise.start(time)
		this.noise.stop(time + 0.09)
		if (this.nodeToDisconnect) {
			this.nodeToDisconnect.disconnect()
			this.nodeToDisconnect = null
		}
		this.nodeToDisconnect = this.noise
		this.setNoiseNode(null)
	}

	play() {
		this.setNoiseNode(this.noise)
		if (!this.isPlaying) {
			this.lastTime = this.audioCtx.currentTime
			this.noise.start()
			this.isPlaying = true
		}
	}
}
