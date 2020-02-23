import * as Actions from './actions/index.js'
import * as Workshop from './workshops/workshopIndex.js'
import { AppFactory } from './appFactory.js'
import { PagePainter } from './pagePainter.js'

if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
	/*window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js').then(worker => {
			//console.log('Service worker registered.', worker)
			navigator.serviceWorker.addEventListener('message', function(event) {
				document.getElementById('version').textContent = event.data
			})
			if (navigator.serviceWorker.controller) {
				navigator.serviceWorker.controller.postMessage('hi')
			}
		})
	})*/
}

const map = {
	main: document.querySelector('main'),
	nav: document.querySelector('nav'),
}

const workshops = {
	mode: new Workshop.Select('chromatique'),
	note: new Workshop.Select('A'),
	gamme: new Workshop.Select('A'),
	octave: new Workshop.Input(3),
	pitch: new Workshop.Input(442, 70),
	tempo: new Workshop.Input(60),
	repeat: new Workshop.Input(1),
	beat: new Workshop.Beat(),
	audio: new Workshop.Audio(),
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
		for (let workshop in this) {
			if (workshop != 'init' &&	 workshop != 'reset') {
				this[workshop].reset()
			}
		}
	},
}

new AppFactory(workshops, map)
