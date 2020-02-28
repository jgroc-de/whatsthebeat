export class AppFactory {
	constructor(workshops, map) {
		this.services = workshops
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
			this.eventDispatcher(
				event,
				this.page,
				this.map,
				this.services,
				this.inputInterval
			)
		}

		this.page = this.setPage(workshops, map.main)
	}

	setPage(workshops, main) {
		let page = workshops['painter'].get(main)
		page.init(workshops)
		workshops.init(main)

		return page
	}

	eventDispatcher(event, page, map, workshops, inputInterval) {
		//faire un systeme de provider
		if (
			(event.type == 'touchend' || event.type == 'mouseup') &&
			!inputInterval
		) {
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
		if (this.buttonCase(event, workshops, page)) {
			return
		}
		this.inputCase(event, workshops, page)
	}

	inputCase(event, workshops, page) {
		let target = null
		let timeInterval = null

		if (event.target.nodeName != 'SELECT' || event.target.nodeName != 'INPUT') {
			target = event.target.parentNode.querySelector('select, input')
		} else {
			target = event.target
		}
		if (target && (target.nodeName == 'SELECT' || target.nodeName == 'INPUT')) {
			timeInterval = workshops[target.id].updateInput(event, target)
			if (timeInterval) {
				this.inputInterval = timeInterval
			}
			page.start(workshops, true)
		}
	}

	buttonCase(event, workshops, page) {
		let target = event.target
		if (target.nodeName !== 'BUTTON') {
			if (target.nodeName !== 'I') {
				return false
			}
			target = event.target.parentNode
		}
		if (
			target.id === 'mute' ||
			(target.id === 'start' && window.location.hash != '')
		) {
			target.classList.toggle('gg-on')
		}
		switch (target.id) {
			case 'start':
				page.start(workshops)
				return true
			case 'random':
				page.random(workshops)
				return true
			case 'reset':
				workshops.reset()
				page.init(workshops)
				this.resetButtons()
				return true
			case 'mute':
				workshops['audio'].mute()
				return true
		}

		return false
	}

	resetButtons() {
		let buttons = document.getElementsByTagName('BUTTON')

		for (let button of buttons) {
			if (button.classList.contains('gg-on')) {
				button.classList.remove('gg-on')
			}
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

		workshops.audio.reset()
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
