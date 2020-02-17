import { Page } from './page.js'

export class Metronome extends Page {
	constructor(state) {
		super(state, 'metronome')
		this.interval = null
		this.inputInterval = null
		this.handleEvent = function(event) {
			this.eventDispatcher(event)
		}
		for (let input of this.inputs) {
			this.updateInput(input)
		}
		this.tempo = 60
	}

	eventDispatcher(event) {
		if (this.firstEvent) {
			let main = document.getElementsByTagName('main')[0]
			if (event.type === 'mousedown') {
				main.removeEventListener('touchstart', this)
				main.removeEventListener('touchend', this)
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
				if (event.type === 'click' || event.type === 'touchstart') {
					this.play(event)
				}
				break
			case 'random':
				if (event.type === 'click' || event.type === 'touchstart') {
					this.setTempo(Math.floor(Math.random() * 160) + 40)
					this.updateInput(event.target)
				}
				break
			default:
				this.manageInputEvent(event)
		}
	}

	getTempo() {
		let tempo = this.inputs[2].value

		this.toSecond(tempo)
	}

	manageInputEvent(event) {
		let input = event.target.parentNode.querySelectorAll('input, select')[0]
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
			this.updateInput(input, value)
			this.inputInterval = setInterval(
				function(that, input, value) {
					that.updateInput(input, value)
				},
				100,
				this,
				input,
				value
			)
		}
	}

	async play(event) {
		if (!this.interval) {
			this.setParams()
			event.target.setAttribute('style', 'border-color:lightGreen')
			this.state.audio.loop(0)
			this.setInterval()
		} else {
			this.stop(true)
		}
	}

	removeEvents() {
		let main = document.getElementsByTagName('main')[0]

		main.removeEventListener('click', this)
		main.removeEventListener('change', this)
		main.removeEventListener('mousedown', this)
		main.removeEventListener('touchstart', this)
		main.removeEventListener('touchend', this)
		this.stop(true)
	}

	setInterval() {
		this.lastTempo = this.tempo
		this.interval = setInterval(
			function(audio, tempo) {
				audio.loop(tempo)
			},
			100,
			this.state.audio,
			this.tempo
		)
	}

	setParams() {
		this.getTempo()
		this.getFrequency()
		this.getNote()
		this.state.audio.setFrequency(this.frequency.getFrequency())
	}

	setTempo(tempo) {
		if (tempo != 0) {
			this.inputs[2].value = tempo
			this.inputs[2].parentNode.nextSibling.textContent = tempo
		}
	}

	stop(end = true) {
		if (this.interval) {
			window.clearInterval(this.interval)
			this.interval = null
			if (end) {
				this.btn.removeAttribute('style')
				this.state.audio.stop()
			}
		}
	}

	toSecond(tempo) {
		this.tempo = 60 / tempo
	}

	updateInput(node, value = 0) {
		if (node.tagName === 'INPUT') {
			this.modifyValue(node, value)
		} else if (node.tagName === 'SELECT') {
			this.modifyNote(value)
		}
		if (this.interval) {
			this.stop(false)
			this.setParams()
			this.setInterval()
		}
	}
}
