export class PagePainter {
	constructor(actions, nav) {
		let pages = document.querySelectorAll('[route]')
		let a = document.createElement('A')
		this.pages = []
		this.actions = actions

		this.regex = /\_/g
		for (let page of pages) {
			if (page.hasAttribute('home')) {
				this.pages['home'] = page
			} else {
				this.pages[page.id] = page
				a.href = page.id
				a.innerText = page.id.slice(1).replace(this.regex, ' ')
				nav.appendChild(a.cloneNode(true))
			}
		}
	}

	get(map, workshops) {
		//remove the # from the hash
		let id = ''
		let route = window.location.hash
		let homeID = this.pages['home'].id

		if (this.pages[route]) {
			id = this.draw(map.main, route)
		} else if (!route) {
			this.draw(map.main, homeID)
		} else {
			id = this.draw(map.main, '#error')
		}

		id = id.slice(1)
		this.setTitle(map.title, id, this.regex)

		let action = this.actions[id]
		if (action == undefined) {
			action = this.actions[homeID.slice(1)]
		}

		workshops.init(map.main)

		return action.prototype
	}

	setTitle(titleNode, id, regex) {
		if (id) {
			id = id.replace(regex, ' ')
		} else {
			id = 'Whats the b**t?'
		}
		titleNode.innerText = id
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
