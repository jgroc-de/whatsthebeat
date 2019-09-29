import { Audio } from './audio.js'
import { Frequency } from './frequency.js'

export class Tuner {
	constructor(state) {
		this.state = state
		this.buildView()
		this.isPlaying = false
		this.frequency = new Frequency()
		this.btn = document.getElementById('startTuner')
		if (!this.state.audio) {
			this.state.audio = new Audio()
		}
		this.inputInterval = null
		this.handleEvent = function(event) {
			this.eventDispatcher(event)
		}
		this.setNodes()
		this.setEvents()
	}

	buildView() {
		let template = document.getElementById('tuner')
		let node = document.importNode(template.content, true)
		this.state.main.appendChild(node)
	}

	async setAudioObject() {
		if (!this.state.audio) {
			this.state.audio = await new Audio(true)
		} else {
			this.state.audio.setAudioContext()
		}
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
	}

	eventDispatcher(event) {
		if (this.inputInterval) {
			window.clearInterval(this.inputInterval)
		}
		if (event.type === 'change') {
			this.updateInput(event.target)
			if (this.isPlaying) {
				this.play(true)
			}

			return
		}
		switch (event.target.id) {
			case 'startTuner':
				if (event.type === 'click') {
					this.play()
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
			if (this.isPlaying) {
				this.play(true)
			}
			this.inputInterval = setInterval(
				function(that, input, value) {
					this.updateInput(input, value)
					if (this.isPlaying) {
						this.play(true)
					}
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
		this.getFrequency()
		this.getNote()
		this.state.audio.setFrequency(this.frequency.getFrequency())
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

	openMic() {
		let audio = this.state.audio

		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices
				.getUserMedia({ audio: true })
				.then(function(stream) {
					audio.setMediaSource(stream)
				})
				.catch(function(err) {
					console.log(err)
				})
		}
		this.mic = true
	}

	removeEvents() {
		let main = document.getElementsByTagName('main')[0]

		main.removeEventListener('click', this)
		main.removeEventListener('change', this)
		main.removeEventListener('mousedown', this)
	}
}
