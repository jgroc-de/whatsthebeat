export class Beat {
    constructor() {
        this.beatCount = -1
    }

    reset() {
		this.beatCount = -1
	}

	count(workshops) {
		let currentTime = workshops.audio.audioCtx.currentTime
		this.beatCount += 1
        let beats = Math.floor((this.beatCount * 60) / currentTime)

		workshops.tempo.node.valueAsNumber = beats
        workshops.tempo.node.dispatchEvent(new Event('input', { bubbles: true }))
	}

	sleep(timeInMs) {
		return new Promise(resolve => setTimeout(resolve, timeInMs))
	}
}