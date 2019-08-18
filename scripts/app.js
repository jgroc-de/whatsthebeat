import { BeatTaker } from "./beatTaker.js"
import { Metronome } from "./metronome.js"

class App {
  constructor(state) {
    this.state = state
    this.toggleSection()
    this.beatTaker = new BeatTaker(state)
    this.handleEvent = function(event) {
      this.toggleHide()
    }
    this.setBurger()
    this.updateMetronome()
  }

  toggleHide(event) {
    this.state.nav.card.toggleAttribute("hidden")
  }

  setEvent(node) {
    node.addEventListener("mouseup", this, false)
  }

  setBurger() {
    let burger = document.getElementById("burger")

    this.setEvent(burger)
    this.setEvent(this.state.nav.card)
  }

  updateMetronome() {
    if (this.metronome) {
      this.metronome.setTempo(this.beatTaker.beat.lastBeat.innerText)
      this.metronome.stop()
    } else if (window.location.hash === "#" + "metronome") {
      this.metronome = new Metronome(this.state)
    }
  }

  hideSection(target) {
    for (let section of this.state.nav.sections) {
      section.setAttribute("hidden", true)
      if ("#" + section.id === window.location.hash) {
        target = section
      }
    }

    return target
  }

  toggleSection() {
    let target = null

    this.updateMetronome()
    target = this.hideSection(target)
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
