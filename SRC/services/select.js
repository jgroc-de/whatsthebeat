//import { ServiceTemplate } from './serviceTemplate.js'

//export class Select extends ServiceTemplate {
export class Select {
	constructor(value) {
		this.node = null
		this.target = null
		this.current = value
		this.def = value
	}

	getSelectedItem(select) {
		let i = 0
		let node = null

		while ((node = select.children[i])) {
			if (select.value === node.value) {
				break
			}
			i++
		}

		return i
	}

	modifyValue(select, add) {
		let i = 0
		let node = null

		while ((node = select.children[i])) {
			if (select.value === node.value) {
				let selection = (i + add) % select.children.length
				if (selection < 0) {
					selection += select.children.length
					if (this.target) {
						let event = new Event('input', { bubbles: true })
						this.target.minus.dispatchEvent(event)
					}
				} else if ((i + add) / select.children.length >= 1) {
					if (this.target) {
						let event = new Event('input', { bubbles: true })
						this.target.plus.dispatchEvent(event)
					}
				}
				select.value = select.children[selection].value

				break
			}
			i++
		}

		return select.value
	}

	init(input, target = null) {
		this.node = input
		this.target = target
	}
}
