import { ViewTemplate } from './viewTemplate.js'

export class Tuner extends ViewTemplate {
	constructor(state) {
		super(state, 'tuner')
		this.isPlaying = false
	}

	async play(keep = false) {
		this.setParams()
		if (keep && this.isPlaying) {
			this.state.audio.stopSound()
			this.isPlaying = false
		}
		if (!this.isPlaying) {
			this.state.audio.startSound()
		} else {
			this.state.audio.stopSound()
		}
		this.isPlaying = !this.isPlaying
	}

	setParams() {
		this.getFrequency()
		this.getNote()
		this.state.audio.setFrequency(this.frequency.getFrequency())
	}

	start(event) {
		if (event.type === 'mousedown' || event.type === 'touchstart') {
			this.play()
		}
	}

	stop() {
		if (this.isPlaying) {
			this.state.audio.stopSound()
		}
	}

	updateInput(node, value = 0) {
		if (node.tagName === 'INPUT') {
			this.modifyValue(node, value)
		}
		if (this.isPlaying) {
			this.play(true)
		}
	}
}
