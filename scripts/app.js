import { BeatTaker } from "./beatTaker.js"
import { Tempo } from "./tempo.js"

class App {
  constructor(state) {
    this.state = state
    this.toggleSection()
    this.beatTaker = new BeatTaker(state)
    this.handleEvent = function(event) {
      this.toggleHide()
    }
    this.setBurger()
    this.tempo = null
  }

  toggleHide(event) {
    this.state.nav.card.toggleAttribute("hidden")
  }

  setEvent(node) {
    node.addEventListener("click", this, false)
  }

  setBurger() {
    let burger = document.getElementById("burger")

    this.setEvent(burger)
    this.setEvent(this.state.nav.card)
  }

  toggleSection() {
    let target = null

    if (this.tempo) {
      this.tempo.setTempo(this.beatTaker.beat.lastBeat.innerText)
    } else if (window.location.hash === "#" + "metronome") {
      this.tempo = new Tempo(this.state)
    }
    for (let section of this.state.nav.sections) {
      section.setAttribute("hidden", true)
      if ("#" + section.id === window.location.hash) {
        target = section
      }
    }
    if (!target) {
      target = this.state.nav.sections[0]
    }
    target.removeAttribute("hidden")
  }
}

const state = {
  audio: null,
  nav : {
    card: document.getElementsByTagName("nav")[0],
    sections: document.getElementsByTagName("section"),
  },
}

const app = new App(state)

window.onhashchange = function() {
  app.toggleSection()
};
