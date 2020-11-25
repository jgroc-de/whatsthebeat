import * as Actions from './actions/index.js'
import * as Workshop from './workshops/workshopIndex.js'
import { AppFactory } from './appFactory.js'

const map = {
	main: document.querySelector('main'),
	nav: document.querySelector('nav'),
	title: document.querySelector('h1'),
}

const workshops = {
	index: [
		'mode',
		'note',
		'gamme',
		'waveForm',
		'octave',
		'pitch',
		'tempo',
		'repeat',
		'beat',
		'audio',
		'painter',
	],
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
	painter: new Workshop.PagePainter(Actions, map.nav.firstElementChild),
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
		for (let workshop of this.index) {
			this[workshop].reset()
		}
	},
	storeValues(canStore) {
		if (canStore) {
			for (let workshop of this.index) {
				localStorage.setItem(workshop, this[workshop].current)
			}
		}
	},
	getStoredValues(workshops) {
		if (!this.storageAvailable('localStorage')) {
			return false
		}
		let storedValue = null
		for (let workshop of this.index) {
			storedValue = localStorage.getItem(workshop)
			if (storedValue) {
				this[workshop].current = storedValue
			}
		}

		return true
	},
	storageAvailable(type) {
		let storage
		try {
			storage = window[type]
			let x = '__storage_test__'
			storage.setItem(x, x)
			storage.removeItem(x)
			return true
		} catch (e) {
			return (
				e instanceof DOMException &&
				// everything except Firefox
				(e.code === 22 ||
					// Firefox
					e.code === 1014 ||
					// test name field too, because code might not be present
					// everything except Firefox
					e.name === 'QuotaExceededError' ||
					// Firefox
					e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
				// acknowledge QuotaExceededError only if there's something already stored
				storage &&
				storage.length !== 0
			)
		}
	},
}

new AppFactory(workshops, map)
