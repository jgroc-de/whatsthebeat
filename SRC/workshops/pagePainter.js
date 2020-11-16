export class PagePainter {
	constructor(actions, nav) {
		let pages = document.querySelectorAll('[route]')
		let a = document.createElement('A')
		this.pages = []
		this.actions = actions
		this.mainTitle = 'Tuner'

		this.regex = /\_/g
		for (let page of pages) {
			if (page.hasAttribute('home')) {
				this.pages['home'] = page
			} else {
				this.pages[page.id] = page
				if (page.id !== 'error') {
					a.href = '/' + page.id
					a.innerText = page.id.replace(this.regex, ' ')
					nav.appendChild(a.cloneNode(true))
				}
			}
		}
	}

	drawNewPage(mainNodes, workshops) {
		let id = ''
		let route = window.location.pathname.slice(1)

		if (!route) {
			route = 'home'
		} else if (!this.pages[route]) {
			route = 'error'
			id = 'error'
		} else {
			id = route
		}
		this.setRobotsMeta(route)
		this.draw(mainNodes.main, this.pages[route].content)


		mainNodes.title.innerText = this.setTitle(id, this.regex)

		let action = this.actions[id]
		if (action == undefined) {
			action = this.actions[this.pages['home'].id]
		}

		workshops.init(mainNodes.main)

		if (action) {
			return action.prototype
		}
		return action
	}

	setTitle(id, regex) {
		if (!id) {
			return this.mainTitle
		} else if (this.pages[id]) {
			return id.replace(regex, ' ')
		}
		return 'error'
		
	}

	draw(main, content) {
		for (let node of content.children) {
			main.appendChild(document.importNode(node, true))
		}
	}

	setRobotsMeta(route) {
		let meta = document.head.querySelector('meta[name=robots]')
		let metaRobots = document.createElement('meta');

		if (meta) {
			document.head.removeChild(meta)
		}
		metaRobots.name = 'robots';
		if (route === 'error') {
    		metaRobots.content = 'noindex';
		}
		document.head.appendChild(metaRobots);
	}

	reset() {}
}
