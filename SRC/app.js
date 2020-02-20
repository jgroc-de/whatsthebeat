import * as Pages from './pages/index.js'
import * as Services from './services/index.js'

class EventController {
	constructor(pageFactory, services, state) {
		this.pageFactory = pageFactory
		this.services = services
		this.state = state
		this.firstEvent = true
		this.inputInterval = null
		this.isPlaying = false
		this.isMuted = true

		window.addEventListener('hashchange', this, { passive: true })
		state.main.addEventListener('change', this, { passive: true })
		document.addEventListener('mousedown', this, { passive: true })
		state.main.addEventListener('mouseup', this, { passive: true })
		document.addEventListener('touchstart', this, { passive: true })
		state.main.addEventListener('touchend', this, { passive: true })
		state.main.addEventListener('input', this, { passive: true })

		this.handleEvent = function(event) {
			this.eventDispatcher(
				event,
				this.page,
				this.state,
				this.services,
				this.pageFactory
			)
		}

		this.page = this.setPage(state, pageFactory, services)
	}

	setPage(state, pageFactory, services) {
		let page = pageFactory.get(state)
		services.init(state.main)

		return page
	}

	eventDispatcher(event, page, state, services, pageFactory) {
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
			this.page = this.setPage(state, pageFactory, services)

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
				page.start(event, state.audio)
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
}

class pageFactory {
	constructor(pages) {
		this.pages = pages
	}

	get(state) {
		//remove the # from the hash
		let route = window.location.hash.slice(1)
		console.log(route)

		if (this.pages[route]) {
			return new this.pages[route](state)
		} else if (!route) {
			return new this.pages['home'](state)
		}

		return new this.pages['error'](state)
	}
}

const state = {
	main: document.querySelector('main'),
	nav: document.querySelector('nav'),
}

let services = {
	mode: new Services.Select('M'),
	note: new Services.Select('A'),
	octave: new Services.Select('M'), //new ServiceTemplate(3),
	pitch: new Services.Select('M'), //new ServiceTemplate(442, 70),
	tempo: new Services.Select('M'), //new ServiceTemplate(60),
	frequency: new Services.Select('M'), //new Frequency(),
	audio: null, //new Audio(),
	init(main) {
		let inputs = main.querySelectorAll('input, select')

		for (let node of inputs) {
			this[node.name].init(node)
		}
		this.note.init(this.note.node, {
			minus: this.octave.node.previousElementSibling,
			plus: this.octave.node.nextElementSibling,
		})
	},
}

services.reset = new Services.Reset(services)
services.mute = new Services.Mute(Services)

new EventController(new pageFactory(Pages), services, state)
