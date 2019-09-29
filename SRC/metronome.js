import { Audio } from './audio.js'
import { Frequency } from './frequency.js'

export class Metronome {
	constructor(state) {
		this.state = state
		this.buildView()
		if (!this.state.audio) {
			this.state.audio = new Audio()
		}
		this.interval = null
		this.inputInterval = null
		this.handleEvent = function(event) {
			this.eventDispatcher(event)
		}
		this.setNodes()
		this.setEvents()
		this.frequency = new Frequency()
		this.tempo = 60
		this.btn = document.getElementById('startTempo')
	}

	buildView() {
		let template = document.getElementById('metronome')
		let node = document.importNode(template.content, true)
		this.state.main.appendChild(node)
	}

	setNodes() {
		this.select = this.state.main.querySelector('select')
		this.select.addEventListener('change', this, false)
		this.inputs = this.state.main.querySelectorAll('input')
		for (let input of this.inputs) {
			this.updateInput(input)
		}
	}

	updateInput(node, value = 0) {
		if (node.tagName === 'INPUT') {
			if (value) {
				node.valueAsNumber += value
			}
			node.parentNode.nextSibling.textContent = node.value
		}
		if (this.interval) {
			this.stop(false)
			this.setParams()
			this.setInterval()
		}
	}

	eventDispatcher(event) {
		console.log(event)
		if (this.inputInterval) {
			window.clearInterval(this.inputInterval)
		}
		if (event.type === 'change') {
			this.updateInput(event.target)

			return
		}
		switch (event.target.id) {
			case 'startTempo':
				if (event.type === 'click') {
					this.play(event)
				}
				break
			default:
				this.manageInputEvent(event)
		}
	}

	manageInputEvent(event) {
		let input = event.target.parentNode.querySelector('input')
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
		if (event.type === 'mousedown') {
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

	setEvents() {
		let main = document.getElementsByTagName('main')[0]

		main.addEventListener('click', this, false)
		main.addEventListener('change', this, false)
		main.addEventListener('mousedown', this, false)
	}

	toSecond(tempo) {
		this.tempo = 60 / tempo
	}

	setTempo(tempo) {
		if (tempo != 0) {
			this.inputs[2].value = tempo
			this.inputs[2].parentNode.nextSibling.textContent = tempo
		}
	}

	getTempo() {
		let tempo = this.inputs[2].value

		this.toSecond(tempo)
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

	getNote() {
		let i = 0
		let node = null
		let value = this.select.value

		while ((node = this.select.children[i])) {
			if (value === node.value) {
				this.frequency.note = i
				return
			}
			i++
		}
	}

	getFrequency() {
		let octave = this.inputs[0].value
		let pitch = this.inputs[1].value

		this.frequency.pitch = pitch
		this.frequency.octave = octave
	}

	setParams() {
		this.getTempo()
		this.getFrequency()
		this.getNote()
		this.state.audio.setFrequency(this.frequency.getFrequency())
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
	}
}
