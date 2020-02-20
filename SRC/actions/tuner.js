export class Tuner {
	async start(audio, isPlaying) {
		if (isPlaying) {
			audio.stopSound()
		} else {
			audio.startSound()
		}

		return !isPlaying
	}

	random(services) {
		services.note.random()
	}
}
