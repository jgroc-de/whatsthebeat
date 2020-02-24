export class BeatTaker {
	start(workshops) {
		workshops.audio.start(true)
		workshops.beat.count(workshops)
	}

	random(workshops) {
		workshops.tempo.node.valueAsNumber = Math.floor(Math.random() * 180) + 40
		workshops.tempo.node.dispatchEvent(new Event('input', { bubbles: true }))
	}

	sleep(timeInMs) {
		return new Promise(resolve => setTimeout(resolve, timeInMs))
	}

	reset() {
		this.beatCount = -1
	}

	count(workshops) {
		let currentTime = workshops.audio.currentTime
		this.beatCount += 1
		let beats = Math.floor((this.beatCount * 60) / currentTime)

		workshops.tempo.node.valueAsNumber = beats
		workshops.tempo.node.dispatchEvent(new Event('input', { bubbles: true }))
	}
}
