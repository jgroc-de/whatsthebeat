export class BeatTaker {
	start(workshops) {
		let audio = workshops.audio
		let beat = workshops.beat

		beat.count(audio.audioCtx.currentTime)
		if (!audio.isMuted) {
			audio.play()
		}
	}

	random() {}

	sleep(timeInMs) {
		return new Promise(resolve => setTimeout(resolve, timeInMs))
	}
}
