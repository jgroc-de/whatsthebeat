export class Beat {
	constructor() {
		this.current = 0
		this.reset()
	}

	reset() {
		this.beatCount = 0
		this.savedTime = [0, 0, 0]
		this.savedTick = 0
		this.fixedBeatCount = this.savedTime.length * 60
	}

	computeBeats(currentTime, beatCount, fixedBeatCount) {
		let beats

		if (beatCount < this.savedTime.length) {
			beats = (beatCount * 60) / currentTime
			this.savedTime[beatCount] = currentTime
		} else {
			beats = fixedBeatCount / (currentTime - this.savedTime[this.savedTick])
			this.savedTime[this.savedTick] = currentTime
			this.savedTick += 1
			if (this.savedTick === this.savedTime.length) {
				this.savedTick = 0
			}
		}
		console.log(this, beats, currentTime)

		return beats
	}

	count(workshops) {
		if (!workshops.audio.interval) {
			this.reset()
		}
		workshops.audio.start(false)
		let beats = this.computeBeats(
			workshops.audio.audioCtx.currentTime,
			this.beatCount,
			this.fixedBeatCount
		)
		this.beatCount += 1

		if (!isNaN(beats) && beats !== Infinity) {
			workshops.tempo.node.valueAsNumber = beats
			workshops.tempo.node.dispatchEvent(new Event('input', { bubbles: true }))
		}
	}
}
