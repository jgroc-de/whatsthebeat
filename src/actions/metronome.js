export class Metronome {
	start(workshops, force = false) {
		let isPlaying = workshops.audio.isPlaying

		workshops.audio.setAudioParams(workshops)
		if (!force && isPlaying) {
			workshops.audio.stop()
		} else {
			if (!isPlaying && !force) {
				workshops.audio.start()
			}
		}
	}

	random(workshops) {
		workshops.tempo.node.valueAsNumber = Math.floor(Math.random() * 180) + 40
		workshops.tempo.node.dispatchEvent(new Event('input', { bubbles: true }))
	}
}
