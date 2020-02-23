export class Input {
	constructor(value, intervalTime = 100) {
		this.default = value
		this.current = value
		this.node = null
		this.intervalTime = intervalTime
		this.target = null
	}

	getTempoToSecond(value) {
		return 60 / value
	}

	init(node, target = null) {
		this.node = node
		if (this.current != 0) {
			node.value = this.current
			this.setVisibleValue(node)
		}
		this.target = target
	}

	modifyValue(node, add) {
		node.valueAsNumber += add

		return node.valueAsNumber
	}

	updateInput(event, inputNode) {
		let add = 0

		switch (event.target.textContent) {
			case '+':
				add = 1
				break
			case '-':
				add = -1
				break
		}
		if (add && event.type !== 'input') {
			this.current = this.modifyValue(inputNode, add)
			this.setVisibleValue(inputNode)

			return window.setInterval(
				function(that, inputNode, add) {
					that.current = that.modifyValue(inputNode, add)
					that.setVisibleValue(inputNode)
				},
				this.intervalTime,
				this,
				inputNode,
				add
			)
		}
		this.current = this.modifyValue(inputNode, add)
		this.setVisibleValue(inputNode)

		return null
	}

	reset() {
		if (this.node) {
			this.node.valueAsNumber = this.default
			this.setVisibleValue(this.node)
		}
	}

	setVisibleValue(node) {
		node.parentNode.parentNode.firstElementChild.querySelectorAll('span')[1].innerText = node.value
	}
}
