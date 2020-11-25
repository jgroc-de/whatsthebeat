export class BeatTaker {
	start(workshops, force = false) {
		workshops.audio.setAudioParams(workshops)
		if (!force) {
			workshops.beat.count(workshops)
		}
	}

	random(workshops) {
		workshops.tempo.node.valueAsNumber = Math.floor(Math.random() * 180) + 40
		workshops.tempo.node.dispatchEvent(new Event('input', { bubbles: true }))
	}
}
