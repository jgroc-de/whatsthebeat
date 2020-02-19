//import { ViewTemplate } from './viewTemplate.js'

//export class Tuner extends ViewTemplate {
export class Tuner {
	constructor(state) {
		//super(state, 'tuner')
	}

	async start(audio, isPlaying) {
		if (isPlaying) {
			audio.stopSound()
		} else {
			audio.startSound()
		}

		return !isPlaying
	}
}
