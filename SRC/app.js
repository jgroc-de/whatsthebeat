import { BeatTaker } from './pages/beatTaker.js'
import { Metronome } from './pages/metronome.js'
import { Tuner } from './pages/tuner.js'
import { ViewTemplate } from './pages/viewTemplate.js/index.js'
import { Select } from './services/select.js'
import { ServiceTemplate } from './services/serviceTemplate.js/index.js'
import { Frequency } from './services/frequency.js'
import { Audio } from './services/audio.js'

class EventController {
	constructor(state, services) {
		this.firstEvent = true

		this.state = state

		this.page = this.pageNoobFactory(window.location.hash, state)

		this.services = services

		this.inputInterval = null

		window.addEventListener('hashchange', this, { passive: true })
		state.main.addEventListener('change', this, { passive: true })
		document.addEventListener('mousedown', this, { passive: true })
		state.main.addEventListener('mouseup', this, { passive: true })
		document.addEventListener('touchstart', this, { passive: true })
		state.main.addEventListener('touchend', this, { passive: true })
		state.main.addEventListener('input', this, { passive: true })

		this.handleEvent = function(event) {
			this.eventDispatcher(event, this.page, this.state, this.services)
		}

		this.initServices(services, state.main)
	}

	eventDispatcher(event, page, state, services) {
		//faire un systeme de provider
		console.log(event.type, event.target)
		if (this.inputInterval && event.type !== 'input') {
			window.clearInterval(this.inputInterval)
			this.inputInterval = null
			return
		}
		this.firstEvent = this.removeUselessListener(this.firstEvent, state.main)
		if (event.type == 'hashchange') {
			services['tempo'].current = this.stopLastPage(page, state.main)
			this.page = this.pageNoobFactory(window.location.hash, state)
			this.initServices(services, state.main)

			return
		}
		if (
			event.target.nodeName == 'A' ||
			event.target.parentNode.id == 'burger' ||
			event.target.id == 'burger' ||
			event.target.className == 'gg-modal'
		) {
			state.nav.toggleAttribute('hidden')
			if (event.target.nodeName == 'A') {
				window.location.hash = event.target.hash
			}

			return
		}
		this.changeButtonDesign(event)

		switch (event.target.id) {
			case 'start':
				page.start(event)
				break
			case 'random':
				page.random(event)
				break
			case 'reset':
				page.reset(event)
				break
			case 'sound':
				page.toggleSound(event)
				break
			default:
				//input case
				let target = ''
				if (
					event.target.nodeName != 'select' ||
					event.target.nodeName != 'input'
				) {
					target = event.target.parentNode.querySelector('select, input')
				} else {
					target = event.target
				}
				let timeInterval = services[target.id].updateInput(event, target)
				if (timeInterval) {
					this.inputInterval = timeInterval
				}
				let frequency = services['frequency'].getFrequency(
					services['pitch'].currentValue,
					services['node'].currentValue,
					services['octave'].currentValue
				)

				state.audio.setFrequency(frequency)
		}
	}

	changeButtonDesign(event) {
		if (
			event.target.nodeName != 'BUTTON' ||
			(event.type != 'touchstart' && event.type != 'mousedown')
		) {
			return
		}

		if (event.target.style.length) {
			event.target.removeAttribute('style')
		} else if (event.target.id == 'start' || event.target.id == 'sound') {
			event.target.setAttribute('style', 'border-color:lightGreen')
		}
	}

	removeUselessListener(firstEvent, main) {
		if (firstEvent) {
			//if touchscreen or computer
			if (event.type === 'mousedown') {
				document.removeEventListener('touchstart', this)
				main.removeEventListener('touchend', this)
			} else {
				document.removeEventListener('mousedown', this)
				main.removeEventListener('mouseup', this)
			}
		}

		return false
	}

	stopLastPage(page, main) {
		let beat = 60 //default

		if (page) {
			if (page.beat) {
				beat = parseInt(page.beat.lastBeat.innerText)
			}
			page.stop(true)
			while (main.children.length) {
				main.removeChild(main.children[0])
			}
		}

		return beat
	}

	initServices(services, main) {
		let inputs = main.querySelectorAll('input, select')

		for (let input of inputs) {
			services[input.name].init(input)
		}
		services['note'].init(services['note'].node, {
			minus: services['octave'].node.previousElementSibling,
			plus: services['octave'].node.nextElementSibling,
		})
	}

	pageNoobFactory(hash, state) {
		switch (hash) {
			case '#tuner':
				return new Tuner(state)
			case '#metronome':
				return new Metronome(state)
			case '#about':
				return new ViewTemplate(state)
			default:
				return new BeatTaker(state)
		}
	}
}

const state = {
	audio: new Audio(),
	main: document.querySelector('main'),
	nav: document.querySelector('nav'),
}
new EventController(state, {
	mode: new Select('M'),
	note: new Select('A'),
	octave: new ServiceTemplate(3),
	pitch: new ServiceTemplate(442, 70),
	tempo: new ServiceTemplate(60),
	Frequency: new Frequency(),
})
