import { Audio } from '../misc/audio.js'
import { Frequency } from '../misc/frequency.js'

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
	}

	buildView(name) {
		let template = document.getElementById(name)
		let node = document.importNode(template.content, true)
		this.state.main.appendChild(node)
	}

	getFrequency() {
		let octave = this.inputs[0].value
		let pitch = this.inputs[1].value

		this.frequency.pitch = pitch
		this.frequency.octave = octave
	}
}
