export class Conductor {
	constructor(services, map) {
		this.services = services
		this.map = map
		this.firstEvent = true
		this.inputInterval = null
		this.isPlaying = false
		this.isMuted = true

		window.addEventListener('hashchange', this, { passive: true })
		map.main.addEventListener('change', this, { passive: true })
		document.addEventListener('mousedown', this, { passive: true })
		map.main.addEventListener('mouseup', this, { passive: true })
		document.addEventListener('touchstart', this, { passive: true })
		map.main.addEventListener('touchend', this, { passive: true })
		map.main.addEventListener('input', this, { passive: true })

		this.handleEvent = function(event) {
			this.eventDispatcher(event, this.page, this.map, this.services)
		}

		this.page = this.setPage(services, map.main)
	}

	setPage(services, main) {
		console.log(services)
		let page = services['painter'].get(main)
		console.log(page)
		services.init(main)

		return page
	}

	eventDispatcher(event, page, map, workshops) {
		//faire un systeme de provider
		console.log(event.type, event.target)
		if (this.inputInterval && event.type !== 'input') {
			window.clearInterval(this.inputInterval)
			this.inputInterval = null
			return
		}
		this.firstEvent = this.removeUselessListener(this.firstEvent, map.main)
		if (event.type == 'hashchange') {
			while (map.main.children.length) {
				map.main.removeChild(main.children[0])
			}
			this.page = this.setPage(workshops, map.main)
			return
		}
		if (
			event.target.nodeName == 'A' ||
			event.target.parentNode.id == 'burger' ||
			event.target.id == 'burger' ||
			event.target.className == 'gg-modal'
		) {
			map.nav.toggleAttribute('hidden')
			if (event.target.nodeName == 'A') {
				window.location.hash = event.target.hash
			}

			return
		}
		this.buttonCase(event)

		switch (event.target.id) {
			case 'start':
				page.start(workshops)
				break
			case 'random':
				page.random()
				break
			case 'reset':
				console.log(workshops)
				for (let workshop in workshops) {
					if (workshop != 'init') {
						workshops[workshop].reset()
					}
				}
				break
			case 'sound':
				workshops['audio'].mute()
				break
			default:
				//input case
				let target = null
				if (
					event.target.nodeName != 'select' ||
					event.target.nodeName != 'input'
				) {
					target = event.target.parentNode.querySelector('select, input')
				} else {
					target = event.target
				}
				if (target) {
					let timeInterval = workshops[target.id].updateInput(event, target)
					if (timeInterval) {
						this.inputInterval = timeInterval
					}
				}

				workshops['audio'].setFrequency(workshops)
		}
	}

	buttonCase(event) {
		if (
			event.target.nodeName != 'BUTTON' ||
			(event.type != 'touchstart' && event.type != 'mousedown')
		) {
			return
		}

		//getbutton()
		//button.changeStyle()
		if (event.target.style.length) {
			event.target.removeAttribute('style')
		} else if (event.target.id == 'start' || event.target.id == 'sound') {
			console.log(event.target)
			event.target.className += ' gg-on'
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
}
