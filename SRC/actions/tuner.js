export class Tuner {
	start(workshops, force = false) {
		let isPlaying = workshops.audio.setAudioParams(workshops)

		workshops.audio.sound.tempo = 0
		if (!force) {
			workshops.audio.stop()
		}
		if ((isPlaying && force) || (!isPlaying && !force)) {
			workshops.audio.start(true)
		}
	}

	random(workshops) {
		let index = Math.floor(Math.random() * 11)

		workshops.note.node.value = workshops.note.node.children[index].value
		workshops.note.node.dispatchEvent(new Event('input', { bubbles: true }))
	}

	init(workshops) {}
}
