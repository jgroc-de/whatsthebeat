export class About {
	constructor(state) {
		this.state = state
		this.buildView()
	}

	buildView() {
		let template = document.getElementById('about')
		let node = document.importNode(template.content, true)
		this.state.main.appendChild(node)
	}

	removeEvents() {
	}
}
