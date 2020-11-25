export class Repeater {
	async start(workshops, force = false) {
		let isPlaying = workshops.audio.setAudioParams(workshops)

		if (!force) {
			if (isPlaying) {
				workshops.audio.stop()
			} else {
				await workshops.audio.repeatXTimes(workshops)
				document
					.getElementById('start')
					.dispatchEvent(new Event('input', { bubbles: true }))
			}
		}
	}

	random(workshops) {}
}
