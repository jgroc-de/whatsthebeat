import { Page } from './page.js'

export class PathGame {
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

	eventDispatcher(event) {
		if (this.firstEvent) {
			let main = document.getElementsByTagName('main')[0]
			if (event.type === 'mousedown') {
				main.removeEventListener('touchend', this)
				main.removeEventListener('touchstart', this)
			} else {
				main.removeEventListener('click', this)
				main.removeEventListener('mousedown', this)
			}
			this.firstEvent = false
		}
		if (this.inputInterval) {
			window.clearInterval(this.inputInterval)
		}
		if (event.type === 'change') {
			this.updateInput(event.target)

			return
		}
		switch (event.target.id) {
			case 'start':
				if (event.type === 'mousedown' || event.type === 'touchstart') {
					this.play()
				}
				break
			case 'random':
				if (event.type === 'click' || event.type === 'touchstart') {
					let rand = Math.floor(Math.random() * 12)
					let note = this.getNote()
					if (note + rand > 11) {
						rand -= note
					}
					this.modifyNote(rand)
					this.updateInput(event.target)
				}
				break
			default:
				this.manageInputEvent(event)
		}
	}

	manageInputEvent(event) {
		let target = event.target.parentNode.querySelectorAll('input, select')[0]
		let value = 0

		switch (event.target.textContent) {
			case '+':
				value = 1
				break
			case '-':
				value = -1
				break
			default:
				return
		}
		if (event.type === 'mousedown' || event.type === 'touchstart') {
			this.updateInput(target, value)
			this.inputInterval = setInterval(
				function(that, target, value) {
					that.updateInput(target, value)
				},
				100,
				this,
				target,
				value
			)
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

	removeEvents() {
		let main = document.getElementsByTagName('main')[0]

		main.removeEventListener('click', this)
		main.removeEventListener('change', this)
		main.removeEventListener('mousedown', this)
		main.removeEventListener('touchstart', this)
		main.removeEventListener('touchend', this)
		if (this.isPlaying) {
			this.state.audio.stopSound()
		}
	}

	setParams() {
		this.getFrequency()
		this.getNote()
		this.state.audio.setFrequency(this.frequency.getFrequency())
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
