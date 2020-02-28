export class Metronome {
	start(workshops, force = false) {
		let isPlaying = workshops.audio.sound.audioCtx

		if (!force) {
			workshops.audio.stop()
		}
		workshops.audio.setAudioParams(workshops)
		if ((isPlaying && force) || (!isPlaying && !force)) {
			workshops.audio.start(true)
		}
	}

	random(workshops) {
		workshops.tempo.node.valueAsNumber = Math.floor(Math.random() * 180) + 40
		workshops.tempo.node.dispatchEvent(new Event('input', { bubbles: true }))
	}

	init(workshops) {}
}
