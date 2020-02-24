export class AppFactory {
	constructor(services, map) {
		this.services = services
		this.map = map
		this.firstEvent = true
		this.inputInterval = null
		this.isPlaying = false

		window.addEventListener('hashchange', this, { passive: true })
		map.main.addEventListener('change', this, { passive: true })
		document.addEventListener('mousedown', this, { passive: true })
		map.main.addEventListener('mouseup', this, { passive: true })
		document.addEventListener('touchstart', this, { passive: true })
		map.main.addEventListener('touchend', this, { passive: true })
		map.main.addEventListener('input', this, { passive: true })

		this.handleEvent = function(event) {
			this.eventDispatcher(event, this.page, this.map, this.services, this.inputInterval)
		}

		this.page = this.setPage(services, map.main)
	}

	setPage(services, main) {
		let page = services['painter'].get(main)
		services.init(main)

		return page
	}

	eventDispatcher(event, page, map, workshops, inputInterval) {
		//faire un systeme de provider
		if ((event.type == 'touchend' || event.type == 'mouseup') && !inputInterval) {
			return
		}
		if (this.inputInterval && event.type !== 'input') {
			window.clearInterval(this.inputInterval)
			this.inputInterval = null
			return
		}
		this.firstEvent = this.removeUselessListener(this.firstEvent, map.main)
		if (this.newPageCase(workshops, map.main, event.type)) {
			return
		}
		if (this.navCase(event.target, map.nav)) {
			return
		}
		this.buttonCase(event)

		switch (event.target.id) {
			case 'start':
				page.start(workshops)
				break
			case 'random':
				page.random(workshops)
				break
			case 'reset':
				workshops.reset()
				break
			case 'mute':
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

				console.log(workshops)
				workshops['audio'].setFrequencyAndTempo(workshops)
		}
	}

	buttonCase(event) {
		if (
			event.target.nodeName == 'BUTTON' &&
			(
				event.target.id === 'mute'
				|| (event.target.id === 'start' && window.location.hash != '')
			)
		) {
			event.target.classList.toggle('gg-on')
		}
	}

	navCase(target, nav) {
		if (
			target.nodeName == 'A' ||
			target.parentNode.id == 'burger' ||
			target.id == 'burger' ||
			target.className == 'gg-modal'
		) {
			nav.toggleAttribute('hidden')
			if (target.nodeName == 'A') {
				window.location.hash = target.hash
			}

			return true
		}

		return false
	}

	newPageCase(workshops, main, type) {
		if (type != 'hashchange') {
			return false
		}

		workshops.audio.stop()
		while (main.children.length) {
			main.removeChild(main.children[0])
		}
		this.page = this.setPage(workshops, main)

		return true
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
