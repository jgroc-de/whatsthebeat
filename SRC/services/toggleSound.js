export class Mute {
	construct(audio) {
		this.audio = audio
	}

	action() {
		if (this.audio.isMuted) {
			this.audio.restoreVolume()
		} else {
			this.audio.silence()
		}
	}
}
