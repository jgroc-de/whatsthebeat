export class Frequency {
  constructor() {
    this.pitches = []

    let rConstante = Math.pow(2, 1/12)
    let note = 0
    while (note < 12) {
      this.pitches[note] = Math.pow(rConstante, note)
      ++note
    }
  }

  getFrequency(pitch, note, octave) {
    return pitch * this.pitches[note] / Math.pow(2, 3 - octave)
  }
}
