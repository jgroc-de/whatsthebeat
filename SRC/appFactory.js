export class AppFactory {
	constructor(workshops, mainNodes) {
		this.workshops = workshops
		this.mainNodes = mainNodes
		this.firstEvent = true
		this.inputInterval = null

		this.canStore = this.workshops.getStoredValues()

		let navLinks = mainNodes.nav.querySelectorAll('a')
		for (let link of navLinks) {
			link.addEventListener('click', this, true)
			link.addEventListener('touchstart', this, true)
		}
		mainNodes.main.addEventListener('change', this, { passive: true })
		document.addEventListener('mousedown', this, { passive: true })
		mainNodes.main.addEventListener('mouseup', this, { passive: true })
		document.addEventListener('touchstart', this, { passive: true })
		mainNodes.main.addEventListener('touchend', this, { passive: true })
		mainNodes.main.addEventListener('input', this, { passive: true })
		window.addEventListener('popstate', this, true)

		this.handleEvent = function(event) {
			this.eventDispatcher(
				event,
				this.page,
				this.mainNodes,
				this.workshops,
				this.inputInterval
			)
		}

		this.page = workshops['painter'].drawNewPage(mainNodes, workshops)
	}

	eventDispatcher(event, page, mainNodes, workshops, inputInterval) {
		//pourrait etre un systeme de provider
		if (
			(event.type === 'touchend' || event.type === 'mouseup') &&
			!inputInterval
		) {
			return
		}
		if (this.inputInterval && event.type !== 'input') {
			window.clearInterval(this.inputInterval)
			this.inputInterval = null
			return
		}
		this.firstEvent = this.removeUselessListener(this.firstEvent, mainNodes.main)
		if (this.newPageCase(workshops, mainNodes.main, event)) {
			return
		}
		if (this.navCase(event.target, mainNodes.nav)) {
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
		this.workshops.storeValues(this.canStore)
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
			target.parentNode.id == 'burger' ||
			target.id == 'burger' ||
			target.className == 'gg-modal'
		) {
			nav.toggleAttribute('hidden')

			return true
		}

		return false
	}

	newPageCase(workshops, main, event) {
		if (event.target.nodeName !== 'A' && event.type !== 'popstate') {
			return false
		}
		if (event.target.nodeName === 'A' && event.type === 'mousedown') {
			return true
		}

		event.preventDefault()
		let hrefUrl = ''
		if (event.type === 'popstate') {
		  hrefUrl = window.location.pathname
		} else {
		  hrefUrl = event.target.getAttribute('href')
		  this.mainNodes.nav.toggleAttribute('hidden')
		}

		workshops.audio.reset()
		while (main.children.length) {
			main.removeChild(main.children[0])
		}
		if (event.type !== 'popstate') {
			window.history.pushState({}, window.title, hrefUrl)
		}
		this.page = workshops['painter'].drawNewPage(this.mainNodes, workshops)
		this.workshops.storeValues(this.canStore)

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
