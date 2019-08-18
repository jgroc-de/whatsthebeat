export class Frequency {
  constructor(note = 0, octave = 3, pitch = 442) {
    this.note = note
    this.octave = octave
    this.pitch = pitch
    this.r = Math.pow(2, 1/12)
  }

  getFrequency() {
    return this.getPitch() / Math.pow(2, 3 - this.octave)
  }

  getPitch() {
    return this.pitch * Math.pow(this.r, this.note)
  }
}
