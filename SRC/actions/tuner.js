export class Tuner {
	start(audio, isPlaying) {
		if (isPlaying) {
			audio.stopSound()
		} else {
			audio.startSound()
		}

		return !isPlaying
	}

	random(workshops) {
		let index = Math.floor(Math.random() * 11)
		workshops.note.node.value = workshops.note.node.children[index].value
		workshops.note.node.dispatchEvent(new Event('input', { bubbles: true }))
	}
}
