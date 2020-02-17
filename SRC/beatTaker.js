import { Audio } from './audio.js'

export class BeatTaker {
	constructor(state) {
		this.state = state
		this.buildView()
		this.state.audio = new Audio()
		this.beat = {
			beatOut: document.getElementById('beat').getElementsByTagName('div')[0],
			lastBeat: document
				.getElementById('lastBeat')
				.getElementsByTagName('div')[0],
			count: -1,
			lastDelta: 1000000000000,
			mute: true,
		}

		this.handleEvent = function(event) {
			this.eventDispatcher(event)
		}
		this.setEvents()
	}

	buildView() {
		let template = document.getElementById('wtb')
		let node = document.importNode(template.content, true)
		this.state.main.appendChild(node)
	}

	setEvents() {
		let body = document.getElementsByTagName('main')[0]
		let tapButton = document.getElementById('start')

		tapButton.addEventListener('mousedown', this, false)
		body.addEventListener('click', this, false)
	}

	eventDispatcher(event) {
		if (event.type === 'mousedown') {
			this.tap()
			return
		}
		let node = event.target

		if (node.tagName === 'SPAN') {
			node = node.parentNode
		}
		switch (node.id) {
			case 'reset':
				this.reset(event)
				break
			case 'sound':
				this.toggleSound(node)
				break
			default:
		}
	}

	reset(event) {
		this.beat.count = -1
		this.beat.lastDelta = 1000000000000
		this.beat.beatOut.textContent = 0
		if (event) {
			this.beat.lastBeat.textContent = 0
		}
		this.state.audio.stop()
	}

	sleep(timeInMs) {
		return new Promise(resolve => setTimeout(resolve, timeInMs))
	}

	async count() {
		if (this.beat.count < 0) {
			this.state.audio.setAudioContext()
			this.beat.count = 0
		} else {
			this.beat.count += 1
			let delta = this.state.audio.audioCtx.currentTime
			let count = this.beat.count
			let beats = Math.floor((this.beat.count * 60) / delta)

			this.beat.beatOut.textContent = beats
			await this.sleep(2100)
			if (count === this.beat.count) {
				this.beat.lastBeat.textContent = beats
				this.reset()
			}
		}
	}

	tap() {
		this.count()
		if (!this.beat.mute) {
			this.state.audio.play()
		}
	}

	toggleSound(node) {
		if (this.beat.mute) {
			this.state.audio.start()
		} else {
			this.state.audio.removeSound()
		}
		this.beat.mute = !this.beat.mute
		node.classList.toggle('gg-on')
	}

	removeEvents() {
		let body = document.getElementsByTagName('main')[0]
		let tapButton = document.getElementById('start')

		tapButton.removeEventListener('mousedown', this)
		body.removeEventListener('click', this)
	}
}
