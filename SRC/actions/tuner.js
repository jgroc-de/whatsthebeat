export class Tuner {
	start(audio, isPlaying) {
		if (isPlaying) {
			audio.stopSound()
		} else {
			audio.startSound()
		}

		return !isPlaying
	}

	random() {
		//launch random note
		//services.note.random()
	}
}
