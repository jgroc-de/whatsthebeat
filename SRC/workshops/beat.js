export class Beat {
	constructor() {
		this.beatCount = 0
	}

	reset() {
		this.beatCount = 0
	}

	count(workshops) {
		if (!workshops.audio.interval) {
			this.reset()
		}
		workshops.audio.start(false)
		let currentTime = workshops.audio.audioCtx.currentTime
		this.beatCount += 1
		let beats = this.beatCount * 60 / currentTime
		console.log(this, beats, currentTime)

		if (beats !== NaN && beats !== Infinity) {
			workshops.tempo.node.valueAsNumber = beats
		} else {
			workshops.tempo.node.valueAsNumber = 0
		}
		workshops.tempo.node.dispatchEvent(new Event('input', { bubbles: true }))
	}

	sleep(timeInMs) {
		return new Promise(resolve => setTimeout(resolve, timeInMs))
	}
}
