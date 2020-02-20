// in your code
/*if (hasMethods(obj, 'quak', 'flapWings', 'waggle')) {
	//  IT'S A DUCK, do your duck thing
}*/
export class reset {
	construct(services) {
		this.audio = services['audio']
		this.services = []
		for (service of services) {
			if (hasMethods(service, 'reset')) {
				this.services.push(service)
			}
		}
	}

	action() {
		this.audio.stop()
		for (service of this.services) {
			service.reset()
		}
	}
}
