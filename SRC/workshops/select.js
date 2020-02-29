import { Input } from './input.js'

export class Select extends Input {
	constructor(value) {
		super(value)
		this.currentValueAsNumber = 0
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
				this.currentValueAsNumber = selection
				select.value = select.children[selection].value

				break
			}
			i++
		}

		return select.value
	}

	reset() {
		if (this.node) {
			this.node.value = this.default
			this.current = this.default
			this.modifyValue(this.node, 0)
			this.setVisibleValue(this.node)
		}
	}
}
