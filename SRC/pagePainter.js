export class PagePainter {
	constructor(actions, nav) {
		let pages = document.querySelectorAll('[route]')
		let a = document.createElement('A')
		this.pages = []
		this.actions = actions

		for (let page of pages) {
			if (page.hasAttribute('home')) {
				this.pages['home'] = page
			} else {
				this.pages[page.id] = page
				a.href = page.id
				a.innerText = page.id.charAt(1).toUpperCase() + page.id.slice(2)
				nav.appendChild(a.cloneNode(true))
			}
		}
	}

	get(main) {
		//remove the # from the hash
		let id = ''
		let route = window.location.hash
		let homeID = this.pages['home'].id

		if (this.pages[route]) {
			id = this.draw(main, route)
		} else if (!route) {
			id = this.draw(main, homeID)
		} else {
			id = this.draw(main, '#error')
		}

		let action = this.actions[id.slice(1)]
		if (action == undefined) {
			action = this.actions[homeID.slice(1)]
		}

		return new action()
	}

	draw(main, name) {
		let content = document.getElementById(name).content
		for (let node of content.children) {
			main.appendChild(document.importNode(node, true))
		}

		return name
	}

	reset() {}
}
