import { Input } from './input.js'

export class Select extends Input {
	constructor(value) {
		super(value)
		this.currentAsNumber = 0
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
		this.valueAsNumber = i

		return select.value
	}

	reset() {
		if (this.node) {
			this.node.value = this.default
			this.setVisibleValue(this.node)
		}
	}
}
