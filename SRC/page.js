import { Audio } from './audio.js'
import { Frequency } from './frequency.js'

export class Page {
	constructor(state, name) {
		this.state = state
		this.frequency = new Frequency()
		this.buildView(name)
		if (!this.state.audio) {
			this.state.audio = new Audio()
		}
		this.interval = null
		this.inputInterval = null
		this.setNodes()
		this.setEvents()
		this.btn = document.getElementById('start')
		this.firstEvent = true
	}

	buildView(name) {
		let template = document.getElementById(name)
		let node = document.importNode(template.content, true)
		this.state.main.appendChild(node)
	}

	eventDispatcher(event) {
		if (this.firstEvent) {
			if (event.type === 'mousedown') {
				this.state.main.removeEventListener('touchstart', this)
				this.state.main.removeEventListener('touchend', this)
			} else {
				this.state.main.removeEventListener('click', this)
				this.state.main.removeEventListener('mousedown', this)
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
				this.start(event)
				break
			case 'random':
				this.random(event)
				break
			default:
				this.manageInputEvent(event)
		}
	}

	getNote() {
		let i = 0
		let node = null
		let value = this.select.value

		while ((node = this.select.children[i])) {
			if (value === node.value) {
				this.frequency.note = i
				return i
			}
			i++
		}

		return i
	}

	getFrequency() {
		let octave = this.inputs[0].value
		let pitch = this.inputs[1].value

		this.frequency.pitch = pitch
		this.frequency.octave = octave
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

	modifyValue(node, value) {
		node.valueAsNumber += value
		node.parentNode.nextSibling.textContent = node.valueAsNumber
		if (node.name === 'octave') {
			this.frequency.octave = node.valueAsNumber
		}
	}

	modifyNote(add) {
		let i = 0
		let node = null
		let value = this.select.value

		while ((node = this.select.children[i])) {
			if (value === node.value) {
				let j = i + add
				let last = this.select.children.length - 1
				let node = this.inputs[0]
				if (j < 0) {
					j = last
					if (this.frequency.octave > 0) {
						this.modifyValue(node, -1)
					}
				} else if (j > last) {
					j = 0
					if (this.frequency.octave < 7) {
						this.modifyValue(node, 1)
					}
				}
				this.select.value = this.select.children[j].value

				return
			}
			i++
		}
	}

	removeEvents() {
		this.state.main.removeEventListener('click', this)
		this.state.main.removeEventListener('change', this)
		this.state.main.removeEventListener('mousedown', this)
		this.state.main.removeEventListener('touchstart', this)
		this.state.main.removeEventListener('touchend', this)
		this.stop(true)
	}

	setEvents() {
		this.state.main.addEventListener('click', this, false)
		this.state.main.addEventListener('change', this, false)
		this.state.main.addEventListener('mousedown', this, false)
		this.state.main.addEventListener('touchend', this, false)
		this.state.main.addEventListener('touchstart', this, false)
	}

	setNodes() {
		this.select = this.state.main.querySelector('select')
		this.inputs = this.state.main.querySelectorAll('input')
	}
}
