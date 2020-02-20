export class ViewTemplate {
	constructor(state, name = 'about') {
		this.state = state
		main.appendChild(
			document.importNode(
				document.getElementById(name).content
				,true
			)
		)
	}
}
