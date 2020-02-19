import { Audio } from '../misc/audio.js'
import { Page } from './page.js'

export class BeatTaker extends Page {
	constructor(state) {
		super(state, 'wtb')
		this.state.audio = new Audio()
		console.log(this.state)
		this.beat = {
			beatOut: this.state.main
				.getElementById('beat')
				.getElementsByTagName('div')[0],
			lastBeat: this.state.main
				.getElementById('lastBeat')
				.getElementsByTagName('div')[0],
			count: -1,
			lastDelta: 1000000000000,
			mute: true,
		}
	}

	reset(event) {
		this.beat.count = -1
		this.beat.lastDelta = 1000000000000
		this.beat.beatOut.textContent = 0
		if (event) {
			this.beat.lastBeat.textContent = 0
		}
		this.state.audio.stop()
	}

	sleep(timeInMs) {
		return new Promise(resolve => setTimeout(resolve, timeInMs))
	}

	async count() {
		if (this.beat.count < 0) {
			this.state.audio.setAudioContext()
			this.beat.count = 0
		} else {
			this.beat.count += 1
			let delta = this.state.audio.audioCtx.currentTime
			let count = this.beat.count
			let beats = Math.floor((this.beat.count * 60) / delta)

			this.beat.beatOut.textContent = beats
			await this.sleep(2100)
			if (count === this.beat.count) {
				this.beat.lastBeat.textContent = beats
				this.reset()
			}
		}
	}

	start() {
		this.count()
		if (!this.beat.mute) {
			this.state.audio.play()
		}
	}

	toggleSound(node) {
		if (this.beat.mute) {
			this.state.audio.start()
		} else {
			this.state.audio.removeSound()
		}
		this.beat.mute = !this.beat.mute
	}
}
