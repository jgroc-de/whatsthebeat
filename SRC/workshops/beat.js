export class Beat {
    constructor() {
        this.reset()
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
}