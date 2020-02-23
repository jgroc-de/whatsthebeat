export class Tuner {
	start(workshops) {
		workshops.audio.toggle()
	}

	random(workshops) {
		let index = Math.floor(Math.random() * 11)
		workshops.note.node.value = workshops.note.node.children[index].value
		workshops.note.node.dispatchEvent(new Event('input', { bubbles: true }))
	}
}
