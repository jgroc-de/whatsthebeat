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

	setEvents() {
		let main = document.getElementsByTagName('main')[0]

		main.addEventListener('click', this, false)
		main.addEventListener('change', this, false)
		main.addEventListener('mousedown', this, false)
		main.addEventListener('touchend', this, false)
		main.addEventListener('touchstart', this, false)
	}

	setNodes() {
		this.select = this.state.main.querySelector('select')
		this.inputs = this.state.main.querySelectorAll('input')
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
}
