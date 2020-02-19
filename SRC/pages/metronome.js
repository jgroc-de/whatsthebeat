//import { ViewTemplate } from './viewTemplate.js'

//export class Metronome extends ViewTemplate {
export class Metronome {
	constructor(state) {
		//super(state, 'metronome')
		//commun à tous
		this.interval = null
	}

	async start(audio, tempo) {
		if (!this.interval) {
			this.interval = setInterval(
				function(audio, tempo) {
					audio.loop(tempo)
				},
				100,
				audio,
				tempo
			)

			return true
		}
		window.clearInterval(this.interval)
		this.interval = null // nécessaire ??
		audio.stop()

		return false
	}

	random(services) {
		services['tempo'].set(Math.floor(Math.random() * 160) + 40)
	}
}
