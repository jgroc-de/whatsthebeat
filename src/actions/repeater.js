export class Repeater {
	async start(workshops, force = false) {
		let isPlaying = workshops.audio.setAudioParams(workshops)

		if (this.repeat === undefined) {
			this.repeat = false
		}
		if (this.count === undefined) {
			this.count = workshops.repeat.current
		} else if (this.count !== workshops.repeat.current) {
			this.repeat = false
			this.count = workshops.repeat.current
		}
		if (!force) {
			if (isPlaying) {
				workshops.audio.stop()
			} else {
				await workshops.audio.repeatXTimes(workshops, parseInt(workshops.repeat.current), this.repeat)
				this.repeat = true
				document.getElementById('start').dispatchEvent(new Event('input', { bubbles: true }))
			}
		}
	}

	random(workshops) {
		this.repeat = false
	}
}
