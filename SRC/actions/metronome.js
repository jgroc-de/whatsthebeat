export class Metronome {
	reset(audio) {
		//à mettre dans audio
		window.clearInterval(audio.interval)
		this.interval = null // nécessaire ??
		audio.stop()
	}

	async start(audio, tempo) {
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

	random(services) {
		services.tempo.random()
		services.tempo.set(Math.floor(Math.random() * 160) + 40)
	}
}
