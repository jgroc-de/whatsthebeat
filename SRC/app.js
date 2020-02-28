import * as Actions from './actions/index.js'
import * as Workshop from './workshops/workshopIndex.js'
import { AppFactory } from './appFactory.js'
import { PagePainter } from './pagePainter.js'

const map = {
	main: document.querySelector('main'),
	nav: document.querySelector('nav'),
}

const workshops = {
	mode: new Workshop.Select('chromatique'),
	note: new Workshop.Select('A'),
	gamme: new Workshop.Select('A'),
	waveForm: new Workshop.Select('sine'),
	octave: new Workshop.Input(3),
	pitch: new Workshop.Input(442, 70),
	tempo: new Workshop.Input(60),
	repeat: new Workshop.Input(1),
	beat: new Workshop.Beat(),
	audio: new Workshop.AudioInterface(),
	painter: new PagePainter(Actions, map.nav.firstElementChild),
	init(main) {
		let inputs = main.querySelectorAll('input, select')

		for (let node of inputs) {
			this[node.name].init(node)
		}
		if (this.octave.node) {
			this.note.init(this.note.node, {
				minus: this.octave.node.previousElementSibling,
				plus: this.octave.node.nextElementSibling,
			})
		}
	},
	reset() {
		console.log(this)
		for (let workshop in this) {
			if (workshop != 'init' && workshop != 'reset') {
				this[workshop].reset()
			}
		}
	},
}

new AppFactory(workshops, map)
