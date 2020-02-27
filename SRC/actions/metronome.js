export class Metronome {
	start(workshops) {
		workshops.audio.setAudioParams(workshops)
		workshops.audio.start(true)
	}

	random(workshops) {
		workshops.tempo.node.valueAsNumber = Math.floor(Math.random() * 180) + 40
		workshops.tempo.node.dispatchEvent(new Event('input', { bubbles: true }))
	}
}
