import { Page } from './page.js'

export class PathGame extends Page {
	constructor(state) {
		super(state, 'pathGame')
		this.isPlaying = false
		this.handleEvent = function(event) {
			this.eventDispatcher(event)
		}
		for (let input of this.inputs) {
			this.updateInput(input)
		}
	}

	async play(keep = false) {
		this.setParams()
		if (keep && this.isPlaying) {
			this.state.audio.stopSound()
			this.btn.removeAttribute('style')
			this.isPlaying = false
		}
		if (!this.isPlaying) {
			this.btn.setAttribute('style', 'border-color:lightGreen')
			this.state.audio.startSound()
		} else {
			this.state.audio.stopSound()
			this.btn.removeAttribute('style')
		}
		this.isPlaying = !this.isPlaying
	}

	random(event) {
		if (event.type === 'click' || event.type === 'touchstart') {
			let rand = Math.floor(Math.random() * 12)
			let note = this.getNote()
			if (note + rand > 11) {
				rand -= note
			}
			this.modifyNote(rand)
			this.updateInput(event.target)
		}
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
		} else if (node.tagName === 'SELECT') {
			this.modifyNote(value)
		}
		if (this.isPlaying) {
			this.play(true)
		}
	}
}
