export class Metronome {
	start(workshops) {
		let audio = workshops['audio']
		let tempo = workshops['tempo'].currentValue
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

	random() {
		//launch event
		//workshops.tempo.set(Math.floor(Math.random() * 160) + 40)
	}
}
