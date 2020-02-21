export class Beat {
	constructor() {
		this.reset()
	}

	reset() {
		this.count = -1
		this.lastDelta = 1000000000000
	}

	async count(currentTime) {
		this.count += 1
		let delta = currentTime
		let beats = Math.floor((this.count * 60) / delta)

		//throw event to change beats
	}
}
