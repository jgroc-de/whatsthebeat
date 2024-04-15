export class Audio {
	constructor() {
		this.lastTime = 0
		this.interval = null
		this.audioCtx = null
		this.gainNode = null
		this.filterNode = null
		this.noise = null
		this.isMuted = false
		this.waveForm = null
		this.frequency = 442
		this.tempo = 0
		this.saved = { frequency: [] }
		this.pitches = this.setPitchesConstantes()
	}

	setAudioParams(workshops) {
		this.setFrequency(
			workshops.note.currentValueAsNumber,
			workshops.pitch.current,
			workshops.octave.current
		)
		this.setTempo(workshops.tempo.current)
		this.setWaveForm(workshops.waveForm.current)
	}

	reset() {
		this.stop()
		this.isMuted = false
		this.waveForm = null
		this.frequency = 0
		this.saved = { frequency: [] }
	}

	mute() {
		if (this.gainNode) {
			if (this.gainNode.gain.value === 0) {
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
		this.frequency = (pitch * this.pitches[note]) / Math.pow(2, 3 - octave)
	}

	setWaveForm(waveForm) {
		this.waveForm = waveForm
	}

	setTempo(tempo) {
		this.tempo = tempo
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
		if (this.nodeToDisconnect) {
			this.nodeToDisconnect.disconnect()
			this.nodeToDisconnect = null
		}
		this.audioCtx = null
	}

	updateNoiseNode() {
		this.waveForm = localStorage.getItem('waveForm')
		this.setFrequency(
			localStorage.getItem('note'),
			parseInt(localStorage.getItem('pitch')),
			parseInt(localStorage.getItem('octave'))
		)
		if (this.noise) {
			this.noise.frequency.value = this.frequency
			this.noise.type = this.waveForm
		}
	}

	setNoiseNode(noise) {
		let gainNode = this.setGainNode(this.audioCtx, this.gainNode, this.isMuted)
		//let filter = this.setFilter(this.audioCtx, this.filterNode)
		noise = new OscillatorNode(this.audioCtx, {
			frequency: this.frequency,
			//type: this.waveForm,
		})
		noise
			//.connect(filter)
			.connect(gainNode)
			.connect(this.audioCtx.destination)
		this.noise = noise
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

	start() {
		this.toggle(this.interval)
	}

	toggle(interval) {
		if (!this.audioCtx) {
			this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
		}

		if (!interval) {
			this.setNoiseNode()
			this.interval = setInterval(
				function (sound) {
					let delta = 60 / sound.tempo

					if (sound.lastTime + delta / 2 <= sound.audioCtx.currentTime) {
						sound.repeat(sound.lastTime + delta, 0.09)
					}
				},
				30000 / 240,
				this
			)
		} else {
			this.stop()
		}
	}

	repeat(time, stopDelta) {
		//console.log('time: ', time)
		this.lastTime = time
		this.noise.start(time)
		this.noise.stop(time + stopDelta)
		if (this.nodeToDisconnect) {
			this.nodeToDisconnect.disconnect()
			this.nodeToDisconnect = null
		}
		this.nodeToDisconnect = this.noise
		this.setNoiseNode(null)
	}

	playContinuousSound() {
		this.waveForm = localStorage.getItem('waveForm')
		this.setFrequency(
			localStorage.getItem('note'),
			parseInt(localStorage.getItem('pitch')),
			parseInt(localStorage.getItem('octave'))
		)

		if (!this.audioCtx) {
			this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
		}

		this.tempo = 0
		this.setNoiseNode(this.noise)

		this.lastTime = this.audioCtx.currentTime
		this.noise.start()
	}

	isPlaying() {
		return this.noise !== null
	}

	async repeatXTimes(workshops, count, useSaved) {
		this.stop()
		let delta = 60 / this.tempo
		console.log(this.saved, count, useSaved)
		let delta2 = 2 * delta
		let delta3 = 3 * delta
		if (!this.audioCtx) {
			this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
		}
		this.setCurrentNoteForRepetition(workshops, 0, useSaved)
		this.setNoiseNode()
		let i = 0
		while (i < count) {
			if (i !== count - 1) {
				this.setCurrentNoteForRepetition(workshops, i + 1, useSaved)
			}
			this.repeat(i * delta3, delta2)
			this.nodeToDisconnect = null
			i++
		}
		await this.sleep(count + 0.1 * delta3 * 1000)
	}

	setCurrentNoteForRepetition(workshops, i, useSaved) {
		console.log('index to save', i)
		if (useSaved) {
			this.frequency = this.saved['frequency'][i]
		} else {
			this.randomNote(workshops)
			this.saved['frequency'].push(this.frequency)
		}
	}

	async sleep(timeInMs) {
		return new Promise((resolve) => setTimeout(resolve, timeInMs))
	}

	randomNote(workshops) {
		this.setFrequency(
			Math.floor(Math.random() * 11),
			workshops.pitch.current,
			workshops.octave.current
		)
	}
}
