export class Mute {
	construct(services) {
		this.audio = services['audio']
	}

	action() {
		if (this.audio.isMuted) {
			this.audio.restoreVolume()
		} else {
			this.audio.silence()
		}
	}
}
