export class Tuner {
	start(workshops, force = false) {
		let isPlaying = workshops.audio.setAudioParams(workshops)

		workshops.audio.tempo = 0
		if (!force && isPlaying) {
			workshops.audio.stop()
		} else if (!force || (force && isPlaying)) {
			workshops.audio.start()
		}
	}

	random(workshops) {
		let index = Math.floor(Math.random() * 11)

		workshops.note.node.value = workshops.note.node.children[index].value
		workshops.note.node.dispatchEvent(new Event('input', { bubbles: true }))
	}
}
