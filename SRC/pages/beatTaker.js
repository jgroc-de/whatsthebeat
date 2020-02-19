//import { ViewTemplate } from './viewTemplate.js'

//export class BeatTaker extends ViewTemplate {
export class BeatTaker {
	constructor(state) {
		//ajouter this.mute = true dans ViewTemplate
		//super(state, 'wtb')
		this.beat = {
			beatOut: document.getElementById('beat').getElementsByTagName('div')[0],
			lastBeat: document
				.getElementById('lastBeat')
				.getElementsByTagName('div')[0],
			count: -1,
			lastDelta: 1000000000000,
		}
	}

	reset(event, audio) {
		audio.stop()
		this.beat.count = -1
		this.beat.lastDelta = 1000000000000
		this.beat.beatOut.textContent = 0
		if (event) {
			this.beat.lastBeat.textContent = 0
		}
	}

	// à déplacer dans le parent
	sleep(timeInMs) {
		return new Promise(resolve => setTimeout(resolve, timeInMs))
	}

	async count(audio, beat) {
		beat.count += 1
		let delta = audio.audioCtx.currentTime
		let count = beat.count
		let beats = Math.floor((beat.count * 60) / delta)

		beat.beatOut.textContent = beats
		//if no more tap, write it
		await this.sleep(2100)
		if (count === beat.count) {
			beat.lastBeat.textContent = beats
			//throw event to reset
		}
	}

	start(audio, mute) {
		this.count(audio, this.beat)
		if (!mute) {
			audio.play()
		}
	}
}
