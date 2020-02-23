export class Metronome {
	start(workshops) {
		let audio = workshops['audio']
		let tempo = workshops['tempo'].current
		if (!this.interval) {
			//à mettre dans l'objet audio
			audio.interval = setInterval(
				function(audio, tempo) {
					audio.loop(tempo)
				},
				100,
				audio,
				tempo
			)

			return true
		}
		audio.stop()

		return false
	}

	random(workshops) {
		workshops.tempo.node.valueAsNumber = Math.floor(Math.random() * 180) + 40
		workshops.tempo.node.dispatchEvent(new Event('input', { bubbles: true }))
	}
}
