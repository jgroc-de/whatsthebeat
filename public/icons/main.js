/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/actions/beatTaker.js":
/*!**********************************!*\
  !*** ./src/actions/beatTaker.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BeatTaker\": function() { return /* binding */ BeatTaker; }\n/* harmony export */ });\nclass BeatTaker {\n\tstart(workshops, force = false) {\n\t\tworkshops.audio.setAudioParams(workshops)\n\t\tif (!force) {\n\t\t\tworkshops.beat.count(workshops)\n\t\t}\n\t}\n\n\trandom(workshops) {\n\t\tworkshops.tempo.node.valueAsNumber = Math.floor(Math.random() * 180) + 40\n\t\tworkshops.tempo.node.dispatchEvent(new Event('input', { bubbles: true }))\n\t}\n}\n\n\n//# sourceURL=webpack://whatsthebeat/./src/actions/beatTaker.js?");

/***/ }),

/***/ "./src/actions/index.js":
/*!******************************!*\
  !*** ./src/actions/index.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"whats_the_beat\": function() { return /* reexport safe */ _beatTaker_js__WEBPACK_IMPORTED_MODULE_0__.BeatTaker; },\n/* harmony export */   \"metronome\": function() { return /* reexport safe */ _metronome_js__WEBPACK_IMPORTED_MODULE_1__.Metronome; },\n/* harmony export */   \"tuner\": function() { return /* reexport safe */ _tuner_js__WEBPACK_IMPORTED_MODULE_2__.Tuner; },\n/* harmony export */   \"follow_my_path\": function() { return /* reexport safe */ _repeater_js__WEBPACK_IMPORTED_MODULE_3__.Repeater; }\n/* harmony export */ });\n/* harmony import */ var _beatTaker_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./beatTaker.js */ \"./src/actions/beatTaker.js\");\n/* harmony import */ var _metronome_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./metronome.js */ \"./src/actions/metronome.js\");\n/* harmony import */ var _tuner_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tuner.js */ \"./src/actions/tuner.js\");\n/* harmony import */ var _repeater_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./repeater.js */ \"./src/actions/repeater.js\");\n/**\n * to declare a new page\n * add a line below\n * exemple:\n *  export { ClassName as template_id } from 'myfile.js'\n *\n * where classname is the class you want tu use\n * urlhash = is the id name of the template matching the route you want to match\n * and myfile.js the path of the file where the class is\n */\n\n\n\n\n\n\n\n//# sourceURL=webpack://whatsthebeat/./src/actions/index.js?");

/***/ }),

/***/ "./src/actions/metronome.js":
/*!**********************************!*\
  !*** ./src/actions/metronome.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Metronome\": function() { return /* binding */ Metronome; }\n/* harmony export */ });\nclass Metronome {\n\tstart(workshops, force = false) {\n\t\tlet isPlaying = workshops.audio.isPlaying\n\n\t\tworkshops.audio.setAudioParams(workshops)\n\t\tif (!force && isPlaying) {\n\t\t\tworkshops.audio.stop()\n\t\t} else {\n\t\t\tif ((!isPlaying && !force)) {\n\t\t\t\tworkshops.audio.start()\n\t\t\t}\n\t\t}\n\t}\n\n\trandom(workshops) {\n\t\tworkshops.tempo.node.valueAsNumber = Math.floor(Math.random() * 180) + 40\n\t\tworkshops.tempo.node.dispatchEvent(new Event('input', { bubbles: true }))\n\t}\n}\n\n\n//# sourceURL=webpack://whatsthebeat/./src/actions/metronome.js?");

/***/ }),

/***/ "./src/actions/repeater.js":
/*!*********************************!*\
  !*** ./src/actions/repeater.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Repeater\": function() { return /* binding */ Repeater; }\n/* harmony export */ });\nclass Repeater {\n\tasync start(workshops, force = false) {\n\t\tlet isPlaying = workshops.audio.setAudioParams(workshops)\n\n\t\tif (this.repeat === undefined) {\n\t\t\tthis.repeat = false\n\t\t}\n\t\tif (this.count === undefined) {\n\t\t\tthis.count = workshops.repeat.current\n\t\t} else if (this.count !== workshops.repeat.current) {\n\t\t\tthis.repeat = false\n\t\t\tthis.count = workshops.repeat.current\n\t\t}\n\t\tif (!force) {\n\t\t\tif (isPlaying) {\n\t\t\t\tworkshops.audio.stop()\n\t\t\t} else {\n\t\t\t\tawait workshops.audio.repeatXTimes(workshops, parseInt(workshops.repeat.current), this.repeat)\n\t\t\t\tthis.repeat = true\n\t\t\t\tdocument.getElementById('start').dispatchEvent(new Event('input', { bubbles: true }))\n\t\t\t}\n\t\t}\n\t}\n\n\trandom(workshops) {\n\t\tthis.repeat = false\n\t}\n}\n\n\n//# sourceURL=webpack://whatsthebeat/./src/actions/repeater.js?");

/***/ }),

/***/ "./src/actions/tuner.js":
/*!******************************!*\
  !*** ./src/actions/tuner.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Tuner\": function() { return /* binding */ Tuner; }\n/* harmony export */ });\nclass Tuner {\n\tstart(workshops, force = false) {\n\t\tlet isPlaying = workshops.audio.setAudioParams(workshops)\n\n\t\tworkshops.audio.tempo = 0\n\t\tif (!force && isPlaying) {\n\t\t\tworkshops.audio.stop()\n\t\t} else if (!force || (force && isPlaying)) {\n\t\t\tworkshops.audio.start()\n\t\t}\n\t}\n\n\trandom(workshops) {\n\t\tlet index = Math.floor(Math.random() * 11)\n\n\t\tworkshops.note.node.value = workshops.note.node.children[index].value\n\t\tworkshops.note.node.dispatchEvent(new Event('input', { bubbles: true }))\n\t}\n}\n\n\n//# sourceURL=webpack://whatsthebeat/./src/actions/tuner.js?");

/***/ }),

/***/ "./src/appFactory.js":
/*!***************************!*\
  !*** ./src/appFactory.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AppFactory\": function() { return /* binding */ AppFactory; }\n/* harmony export */ });\nclass AppFactory {\n\tconstructor(workshops, mainNodes) {\n\t\tthis.workshops = workshops\n\t\tthis.mainNodes = mainNodes\n\t\tthis.firstEvent = true\n\t\tthis.inputInterval = null\n\n\t\tthis.canStore = this.workshops.getStoredValues()\n\n\t\tlet navLinks = mainNodes.nav.querySelectorAll('a')\n\t\tfor (let link of navLinks) {\n\t\t\tlink.addEventListener('click', this, true)\n\t\t\tlink.addEventListener('touchstart', this, true)\n\t\t}\n\t\tmainNodes.main.addEventListener('change', this, { passive: true })\n\t\tdocument.addEventListener('mousedown', this, { passive: true })\n\t\tmainNodes.main.addEventListener('mouseup', this, { passive: true })\n\t\tdocument.addEventListener('touchstart', this, { passive: true })\n\t\tmainNodes.main.addEventListener('touchend', this, { passive: true })\n\t\tmainNodes.main.addEventListener('input', this, { passive: true })\n\t\twindow.addEventListener('popstate', this, true)\n\t\tthis.page = workshops['painter'].drawNewPage(mainNodes, workshops)\n\t\tthis.handleEvent = function(event) {\n\t\t\tthis.eventDispatcher(\n\t\t\t\tevent,\n\t\t\t\tthis.page,\n\t\t\t\tthis.mainNodes,\n\t\t\t\tthis.workshops,\n\t\t\t\tthis.inputInterval\n\t\t\t)\n\t\t}\n\t}\n\n\teventDispatcher(event, page, mainNodes, workshops, inputInterval) {\n\t\t//pourrait etre un systeme de provider\n\t\tif (\n\t\t\t(event.type === 'touchend' || event.type === 'mouseup') &&\n\t\t\t!inputInterval\n\t\t) {\n\t\t\treturn\n\t\t}\n\t\tif (this.inputInterval && event.type !== 'input') {\n\t\t\twindow.clearInterval(this.inputInterval)\n\t\t\tthis.inputInterval = null\n\t\t\treturn\n\t\t}\n\t\tthis.firstEvent = this.removeUselessListener(this.firstEvent, event, mainNodes.main)\n\t\tif (this.newPageCase(workshops, mainNodes.main, event)) {\n\t\t\treturn\n\t\t}\n\t\tif (this.navCase(event, mainNodes.nav)) {\n\t\t\treturn\n\t\t}\n\t\tif (this.buttonCase(event, workshops, page)) {\n\t\t\treturn\n\t\t}\n\t\tthis.inputCase(event, workshops, page)\n\t}\n\n\tinputCase(event, workshops, page) {\n\t\tlet target = null\n\t\tlet timeInterval = null\n\n\t\tif (event.target.nodeName !== 'SELECT' || event.target.nodeName !== 'INPUT') {\n\t\t\ttarget = event.target.parentNode.querySelector('select, input')\n\t\t} else {\n\t\t\ttarget = event.target\n\t\t}\n\t\tif (target && (target.nodeName === 'SELECT' || target.nodeName === 'INPUT')) {\n\t\t\ttimeInterval = workshops[target.id].updateInput(event, target)\n\t\t\tif (timeInterval) {\n\t\t\t\tthis.inputInterval = timeInterval\n\t\t\t}\n\t\t\tpage.start(workshops, true)\n\t\t}\n\t\tthis.workshops.storeValues(this.canStore)\n\t}\n\n\tbuttonCase(event, workshops, page) {\n\t\tif (event.which && event.which !== 1) {\n\t\t\treturn false;\n\t\t}\n\t\tlet target = event.target\n\t\tif (target.nodeName !== 'BUTTON') {\n\t\t\tif (target.nodeName !== 'I') {\n\t\t\t\treturn false\n\t\t\t}\n\t\t\ttarget = event.target.parentNode\n\t\t}\n\t\tif (target.id === 'mute' || target.id === 'start') {\n\t\t\ttarget.classList.toggle('gg-on')\n\t\t}\n\t\tswitch (target.id) {\n\t\t\tcase 'start':\n\t\t\t\tpage.start(workshops)\n\t\t\t\treturn true\n\t\t\tcase 'random':\n\t\t\t\tpage.random(workshops)\n\t\t\t\treturn true\n\t\t\tcase 'reset':\n\t\t\t\tworkshops.reset()\n\t\t\t\tthis.resetButtons()\n\t\t\t\treturn true\n\t\t\tcase 'mute':\n\t\t\t\tworkshops['audio'].mute()\n\t\t\t\treturn true\n\t\t\tcase 'help':\n\t\t\t\tthis.helpButton()\n\t\t\t\treturn true\n\t\t\tcase 'close-help':\n\t\t\t\tthis.closeHelpButton()\n\t\t\t\treturn true\n\t\t\tdefault:\n\t\t\t\treturn false\n\t\t}\n\t}\n\n\tresetButtons() {\n\t\tlet buttons = document.getElementsByTagName('BUTTON')\n\n\t\tfor (let button of buttons) {\n\t\t\tif (button.classList.contains('gg-on')) {\n\t\t\t\tbutton.classList.remove('gg-on')\n\t\t\t}\n\t\t}\n\t}\n\n\n\thelpButton() {\n\t\tlet helpHTML = document.getElementById('helper')\n\t\tlet helpBox = document.getElementById('help-box')\n\n\t\tif (helpHTML) {\n\t\t\thelpBox.lastElementChild.innerHTML = helpHTML.innerHTML\n\t\t\thelpBox.hidden = false\n\t\t}\n\t}\n\n\tcloseHelpButton() {\n\t\tdocument.getElementById('help-box').hidden = true\n\t}\n\n\tnavCase(event, nav) {\n\t\tif (event.which !== 1) {\n\t\t\treturn false\n\t\t}\n\t\tlet target = event.target;\n\t\tif (\n\t\t\ttarget.parentNode.id === 'burger' ||\n\t\t\ttarget.id === 'burger' ||\n\t\t\ttarget.className === 'gg-modal'\n\t\t) {\n\t\t\tnav.toggleAttribute('hidden')\n\t\t\tthis.closeHelpButton()\n\n\t\t\treturn true\n\t\t}\n\n\t\treturn false\n\t}\n\n\tnewPageCase(workshops, main, event) {\n\t\tif (event.target.nodeName !== 'A' && event.type !== 'popstate') {\n\t\t\treturn false\n\t\t}\n\t\tif (event.target.nodeName === 'A' && event.type === 'mousedown') {\n\t\t\treturn true\n\t\t}\n\n\t\tevent.preventDefault()\n\t\tlet hrefUrl = ''\n\t\tif (event.type === 'popstate') {\n\t\t  hrefUrl = window.location.pathname\n\t\t} else {\n\t\t  hrefUrl = event.target.getAttribute('href')\n\t\t  this.mainNodes.nav.toggleAttribute('hidden')\n\t\t}\n\n\t\tworkshops.audio.reset()\n\t\twhile (main.children.length) {\n\t\t\tmain.removeChild(main.children[0])\n\t\t}\n\t\tif (event.type !== 'popstate') {\n\t\t\twindow.history.pushState({}, window.title, hrefUrl)\n\t\t}\n\t\tthis.page = workshops['painter'].drawNewPage(this.mainNodes, workshops)\n\t\tdocument.title = document.getElementById('wtb-title').innerText\n\t\tlet description = document.querySelector('meta[name=\"description\"]')\n\t\tdescription.content = document.getElementById('wtb-description').innerText\n\t\tthis.workshops.storeValues(this.canStore)\n\n\t\treturn true\n\t}\n\n\tremoveUselessListener(firstEvent, event, main) {\n\t\tif (firstEvent) {\n\t\t\t//if touchscreen or computer\n\t\t\tif (event.type === 'mousedown') {\n\t\t\t\tdocument.removeEventListener('touchstart', this)\n\t\t\t\tmain.removeEventListener('touchend', this)\n\t\t\t} else {\n\t\t\t\tdocument.removeEventListener('mousedown', this)\n\t\t\t\tmain.removeEventListener('mouseup', this)\n\t\t\t}\n\t\t}\n\n\t\treturn false\n\t}\n}\n\n\n//# sourceURL=webpack://whatsthebeat/./src/appFactory.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _actions_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actions/index.js */ \"./src/actions/index.js\");\n/* harmony import */ var _workshops_workshopIndex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./workshops/workshopIndex.js */ \"./src/workshops/workshopIndex.js\");\n/* harmony import */ var _appFactory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./appFactory.js */ \"./src/appFactory.js\");\n\n\n\n\nconst mainNodes = {\n\tmain: document.querySelector('main'),\n\tnav: document.querySelector('nav'),\n\ttitle: document.querySelector('h1'),\n}\n\nconst workshops = {\n\tindex: [\n\t\t'mode',\n\t\t'note',\n\t\t'gamme',\n\t\t'waveForm',\n\t\t'octave',\n\t\t'pitch',\n\t\t'tempo',\n\t\t'repeat',\n\t\t'beat',\n\t\t'audio',\n\t\t'painter',\n\t],\n\tmode: new _workshops_workshopIndex_js__WEBPACK_IMPORTED_MODULE_1__.Select('chromatique'),\n\tnote: new _workshops_workshopIndex_js__WEBPACK_IMPORTED_MODULE_1__.Select('A'),\n\tgamme: new _workshops_workshopIndex_js__WEBPACK_IMPORTED_MODULE_1__.Select('A'),\n\twaveForm: new _workshops_workshopIndex_js__WEBPACK_IMPORTED_MODULE_1__.Select('sine'),\n\toctave: new _workshops_workshopIndex_js__WEBPACK_IMPORTED_MODULE_1__.Input(3),\n\tpitch: new _workshops_workshopIndex_js__WEBPACK_IMPORTED_MODULE_1__.Input(442, 70),\n\ttempo: new _workshops_workshopIndex_js__WEBPACK_IMPORTED_MODULE_1__.Input(60),\n\trepeat: new _workshops_workshopIndex_js__WEBPACK_IMPORTED_MODULE_1__.Input(1),\n\tbeat: new _workshops_workshopIndex_js__WEBPACK_IMPORTED_MODULE_1__.Beat(),\n\taudio: new _workshops_workshopIndex_js__WEBPACK_IMPORTED_MODULE_1__.Audio(),\n\tpainter: new _workshops_workshopIndex_js__WEBPACK_IMPORTED_MODULE_1__.PagePainter(_actions_index_js__WEBPACK_IMPORTED_MODULE_0__, mainNodes.nav.firstElementChild),\n\tinit(main) {\n\t\tlet inputs = main.querySelectorAll('input, select')\n\n\t\tfor (let node of inputs) {\n\t\t\tthis[node.name].init(node)\n\t\t}\n\t\tif (this.octave.node) {\n\t\t\tthis.note.init(this.note.node, {\n\t\t\t\tminus: this.octave.node.previousElementSibling,\n\t\t\t\tplus: this.octave.node.nextElementSibling,\n\t\t\t})\n\t\t}\n\t},\n\treset() {\n\t\tfor (let workshop of this.index) {\n\t\t\tthis[workshop].reset()\n\t\t}\n\t},\n\tstoreValues(canStore) {\n\t\tif (canStore) {\n\t\t\tfor (let workshop of this.index) {\n\t\t\t\tlocalStorage.setItem(workshop, this[workshop].current)\n\t\t\t}\n\t\t}\n\t},\n\tgetStoredValues() {\n\t\tif (!this.storageAvailable('localStorage')) {\n\t\t\treturn false\n\t\t}\n\t\tlet storedValue = null\n\t\tfor (let workshop of this.index) {\n\t\t\tstoredValue = localStorage.getItem(workshop)\n\t\t\tif (storedValue) {\n\t\t\t\tthis[workshop].current = storedValue\n\t\t\t}\n\t\t}\n\n\t\treturn true\n\t},\n\tstorageAvailable(type) {\n\t\tlet storage\n\t\ttry {\n\t\t\tstorage = window[type]\n\t\t\tlet x = '__storage_test__'\n\t\t\tstorage.setItem(x, x)\n\t\t\tstorage.removeItem(x)\n\t\t\treturn true\n\t\t} catch (e) {\n\t\t\treturn (\n\t\t\t\te instanceof DOMException &&\n\t\t\t\t// everything except Firefox\n\t\t\t\t(e.code === 22 ||\n\t\t\t\t\t// Firefox\n\t\t\t\t\te.code === 1014 ||\n\t\t\t\t\t// test name field too, because code might not be present\n\t\t\t\t\t// everything except Firefox\n\t\t\t\t\te.name === 'QuotaExceededError' ||\n\t\t\t\t\t// Firefox\n\t\t\t\t\te.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&\n\t\t\t\t// acknowledge QuotaExceededError only if there's something already stored\n\t\t\t\tstorage &&\n\t\t\t\tstorage.length !== 0\n\t\t\t)\n\t\t}\n\t},\n}\n\nnew _appFactory_js__WEBPACK_IMPORTED_MODULE_2__.AppFactory(workshops, mainNodes)\n\n\n//# sourceURL=webpack://whatsthebeat/./src/index.js?");

/***/ }),

/***/ "./src/workshops/audio.js":
/*!********************************!*\
  !*** ./src/workshops/audio.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Audio\": function() { return /* binding */ Audio; }\n/* harmony export */ });\nclass Audio {\n\tconstructor() {\n\t\tthis.lastTime = 0\n\t\tthis.interval = null\n\t\tthis.audioCtx = null\n\t\tthis.gainNode = null\n\t\tthis.filterNode = null\n\t\tthis.noise = null\n\t\tthis.isMuted = false\n\t\tthis.waveForm = null\n\t\tthis.frequency = 0\n\t\tthis.tempo = 0\n\t\tthis.saved = {'frequency': []}\n\t\tthis.pitches = this.setPitchesConstantes()\n\t\tthis.isPlaying = false\n\t}\n\n\tsetAudioParams(workshops) {\n\t\tthis.setFrequency(\n\t\t\tworkshops.note.currentValueAsNumber,\n\t\t\tworkshops.pitch.current,\n\t\t\tworkshops.octave.current\n\t\t)\n\t\tthis.setTempo(workshops.tempo.current)\n\t\tthis.setWaveForm(workshops.waveForm.current)\n\n\t\treturn this.isPlaying\n\t}\n\n\treset() {\n\t\tthis.stop()\n\t\tthis.isMuted = false\n\t\tthis.waveForm = null\n\t\tthis.frequency = 0\n\t\tthis.saved = {'frequency': []}\n\t}\n\n\tmute() {\n\t\tif (this.gainNode) {\n\t\t\tif (this.gainNode.gain.value === 0) {\n\t\t\t\tthis.gainNode.gain.linearRampToValueAtTime(1, this.audioCtx.currentTime)\n\t\t\t} else {\n\t\t\t\tthis.gainNode.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime)\n\t\t\t}\n\t\t}\n\t\tthis.isMuted = !this.isMuted\n\t}\n\n\tsetPitchesConstantes() {\n\t\tlet rConstante = Math.pow(2, 1 / 12)\n\t\tlet note = 0\n\t\tlet pitches = []\n\n\t\twhile (note < 12) {\n\t\t\tpitches[note] = Math.pow(rConstante, note)\n\t\t\t++note\n\t\t}\n\n\t\treturn pitches\n\t}\n\n\tsetFrequency(note, pitch, octave) {\n\t\tthis.frequency = (pitch * this.pitches[note]) / Math.pow(2, 3 - octave)\n\t}\n\n\tsetWaveForm(waveForm) {\n\t\tthis.waveForm = waveForm\n\t}\n\n\tsetTempo(tempo) {\n\t\tthis.tempo = tempo\n\t}\n\n\tstop() {\n\t\tif (this.interval) {\n\t\t\twindow.clearInterval(this.interval)\n\t\t\tthis.interval = null\n\t\t}\n\t\tthis.lastTime = 0\n\t\tif (this.noise) {\n\t\t\tthis.noise.disconnect()\n\t\t}\n\t\tif (this.gainNode) {\n\t\t\tthis.gainNode.disconnect()\n\t\t}\n\t\tif (this.filterNode) {\n\t\t\tthis.filterNode.disconnect()\n\t\t}\n\t\tthis.noise = null\n\t\tthis.gainNode = null\n\t\tthis.filterNode = null\n\t\tthis.isPlaying = false\n\t\tif (this.nodeToDisconnect) {\n\t\t\tthis.nodeToDisconnect.disconnect()\n\t\t\tthis.nodeToDisconnect = null\n\t\t}\n\t\tthis.audioCtx = null\n\t}\n\n\tsetNoiseNode(noise) {\n\t\tlet gainNode = this.setGainNode(this.audioCtx, this.gainNode, this.isMuted)\n\t\tif (!noise) {\n\t\t\tlet filter = this.setFilter(this.audioCtx, this.filterNode)\n\t\t\tnoise = new OscillatorNode(this.audioCtx, {\n\t\t\t\tfrequency: this.frequency,\n\t\t\t\ttype: this.waveForm,\n\t\t\t})\n\t\t\tnoise\n\t\t\t\t.connect(filter)\n\t\t\t\t.connect(gainNode)\n\t\t\t\t.connect(this.audioCtx.destination)\n\t\t\tthis.noise = noise\n\n\t\t\treturn true\n\t\t}\n\t\tnoise.frequency.value = this.frequency\n\t\tnoise.type = this.waveForm\n\n\t\treturn false\n\t}\n\n\tsetGainNode(audioCtx, gainNode, isMuted) {\n\t\tif (!gainNode) {\n\t\t\tgainNode = audioCtx.createGain()\n\t\t\tthis.gainNode = gainNode\n\t\t}\n\n\t\tif (isMuted) {\n\t\t\tgainNode.gain.value = 0\n\t\t} else {\n\t\t\tgainNode.gain.value = 1\n\t\t}\n\n\t\treturn gainNode\n\t}\n\n\tsetFilter(audioCtx, filterNode) {\n\t\tif (!filterNode) {\n\t\t\tfilterNode = audioCtx.createBiquadFilter('bandpass')\n\n\t\t\tfilterNode.Q.value = 0.1\n\n\t\t\tthis.filterNode = filterNode\n\t\t}\n\n\t\treturn this.filterNode\n\t}\n\n\tstart(shouldPlay = true) {\n\t\tif (!this.audioCtx) {\n\t\t\tthis.audioCtx = new (window.AudioContext || window.webkitAudioContext)()\n\t\t}\n\t\tif (shouldPlay) {\n\t\t\tif (this.tempo === 0) {\n\t\t\t\tthis.play()\n\t\t\t} else {\n\t\t\t\tthis.toggle(this.interval)\n\t\t\t}\n\t\t} else {\n\t\t\tif (this.interval) {\n\t\t\t\twindow.clearTimeout(this.interval)\n\t\t\t}\n\t\t\tthis.interval = setTimeout(\n\t\t\t\tfunction(sound) {\n\t\t\t\t\tsound.reset()\n\t\t\t\t},\n\t\t\t\t2500,\n\t\t\t\tthis\n\t\t\t)\n\t\t}\n\t}\n\n\ttoggle(interval) {\n\t\tif (!interval) {\n\t\t\tthis.isPlaying = true\n\t\t\tthis.setNoiseNode()\n\t\t\tthis.interval = setInterval(\n\t\t\t\tfunction(sound) {\n\t\t\t\t\tlet delta = 60 / sound.tempo\n\n\t\t\t\t\tif (sound.lastTime + delta / 2 <= sound.audioCtx.currentTime) {\n\t\t\t\t\t\tsound.repeat(sound.lastTime + delta, 0.09)\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\t30000 / 240,\n\t\t\t\tthis\n\t\t\t)\n\t\t} else {\n\t\t\tthis.stop()\n\t\t}\n\t}\n\n\trepeat(time, stopDelta) {\n\t\tconsole.log(\"time: \", time)\n\t\tthis.lastTime = time\n\t\tthis.noise.start(time)\n\t\tthis.noise.stop(time + stopDelta)\n\t\tif (this.nodeToDisconnect) {\n\t\t\tthis.nodeToDisconnect.disconnect()\n\t\t\tthis.nodeToDisconnect = null\n\t\t}\n\t\tthis.nodeToDisconnect = this.noise\n\t\tthis.setNoiseNode(null)\n\t}\n\n\tplay() {\n\t\tthis.setNoiseNode(this.noise)\n\t\tif (!this.isPlaying) {\n\t\t\tthis.lastTime = this.audioCtx.currentTime\n\t\t\tthis.noise.start()\n\t\t\tthis.isPlaying = true\n\t\t}\n\t}\n\n\tasync repeatXTimes(workshops, count, useSaved) {\n\t\tthis.stop()\n\t\tlet delta = 60 / this.tempo\n\t\tconsole.log(this.saved, count, useSaved)\n\t\tlet delta2 = 2 * delta\n\t\tlet delta3 = 3 * delta\n\t\tthis.isPlaying = true\n\t\tif (!this.audioCtx) {\n\t\t\tthis.audioCtx = new (window.AudioContext || window.webkitAudioContext)()\n\t\t}\n\t\tthis.setCurrentNoteForRepetition(workshops, 0, useSaved)\n\t\tthis.setNoiseNode()\n\t\tlet i = 0\n\t\twhile (i < count) {\n\t\t\tif (i !== count - 1) {\n\t\t\t\tthis.setCurrentNoteForRepetition(workshops, i + 1, useSaved)\n\t\t\t}\n\t\t\tthis.repeat(i * delta3, delta2)\n\t\t\tthis.nodeToDisconnect = null\n\t\t\ti++\n\t\t} \n\t\tawait this.sleep(count + 0.1 * delta3 * 1000)\n\t}\n\n\tsetCurrentNoteForRepetition(workshops, i, useSaved) {\n\t\tconsole.log(\"index to save\", i)\n\t\tif (useSaved) {\n\t\t\tthis.frequency = this.saved['frequency'][i]\n\t\t} else {\n\t\t\tthis.randomNote(workshops)\n\t\t\tthis.saved['frequency'].push(this.frequency)\n\t\t}\n\t}\n\n\tasync sleep(timeInMs) {\n\t\treturn new Promise(resolve => setTimeout(resolve, timeInMs))\n\t}\n\n\trandomNote(workshops) {\n\t\tthis.setFrequency(\n\t\t\tMath.floor(Math.random() * 11),\n\t\t\tworkshops.pitch.current,\n\t\t\tworkshops.octave.current\n\t\t)\n\t}\n}\n\n\n//# sourceURL=webpack://whatsthebeat/./src/workshops/audio.js?");

/***/ }),

/***/ "./src/workshops/beat.js":
/*!*******************************!*\
  !*** ./src/workshops/beat.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Beat\": function() { return /* binding */ Beat; }\n/* harmony export */ });\nclass Beat {\n\tconstructor() {\n\t\tthis.current = 0\n\t\tthis.reset()\n\t}\n\n\treset() {\n\t\tthis.beatCount = 0\n\t\tthis.savedTime = [0, 0, 0]\n\t\tthis.savedTick = 0\n\t\tthis.fixedBeatCount = this.savedTime.length * 60\n\t}\n\n\tcomputeBeats(currentTime, beatCount, fixedBeatCount) {\n\t\tlet beats\n\n\t\tif (beatCount < this.savedTime.length) {\n\t\t\tbeats = (beatCount * 60) / currentTime\n\t\t\tthis.savedTime[beatCount] = currentTime\n\t\t} else {\n\t\t\tbeats = fixedBeatCount / (currentTime - this.savedTime[this.savedTick])\n\t\t\tthis.savedTime[this.savedTick] = currentTime\n\t\t\tthis.savedTick += 1\n\t\t\tif (this.savedTick === this.savedTime.length) {\n\t\t\t\tthis.savedTick = 0\n\t\t\t}\n\t\t}\n\t\tconsole.log(this, beats, currentTime)\n\t\t\n\t\treturn beats\n\t}\n\n\tcount(workshops) {\n\t\tif (!workshops.audio.interval) {\n\t\t\tthis.reset()\n\t\t}\n\t\tworkshops.audio.start(false)\n\t\tlet beats = this.computeBeats(workshops.audio.audioCtx.currentTime, this.beatCount, this.fixedBeatCount)\n\t\tthis.beatCount += 1\n\n\t\tif (!isNaN(beats) && beats !== Infinity) {\n\t\t\tworkshops.tempo.node.valueAsNumber = beats\n\t\t\tworkshops.tempo.node.dispatchEvent(new Event('input', { bubbles: true }))\n\t\t}\n\t}\n}\n\n\n//# sourceURL=webpack://whatsthebeat/./src/workshops/beat.js?");

/***/ }),

/***/ "./src/workshops/input.js":
/*!********************************!*\
  !*** ./src/workshops/input.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Input\": function() { return /* binding */ Input; }\n/* harmony export */ });\nclass Input {\n\tconstructor(value, intervalTime = 100) {\n\t\tthis.default = value\n\t\tthis.current = value\n\t\tthis.node = null\n\t\tthis.intervalTime = intervalTime\n\t\tthis.target = null\n\t}\n\n\tgetTempoToSecond(value) {\n\t\treturn 60 / value\n\t}\n\n\tinit(node, target = null) {\n\t\tthis.node = node\n\t\tif (this.current !== 0) {\n\t\t\tnode.value = this.current\n\t\t\tthis.setVisibleValue(node)\n\t\t}\n\t\tthis.target = target\n\t}\n\n\tmodifyValue(node, add) {\n\t\tnode.valueAsNumber += add\n\n\t\treturn node.valueAsNumber\n\t}\n\n\tupdateInput(event, inputNode) {\n\t\tlet add = 0\n\n\t\tswitch (event.target.textContent) {\n\t\t\tcase '+':\n\t\t\t\tadd = 1\n\t\t\t\tbreak\n\t\t\tcase '-':\n\t\t\t\tadd = -1\n\t\t\t\tbreak\n\t\t\tdefault:\n\t\t}\n\t\tthis.current = this.modifyValue(inputNode, add)\n\t\tthis.setVisibleValue(inputNode)\n\t\tif (add && event.type !== 'input') {\n\t\t\treturn window.setInterval(\n\t\t\t\tfunction(that, inputNode, add) {\n\t\t\t\t\tthat.current = that.modifyValue(inputNode, add)\n\t\t\t\t\tthat.setVisibleValue(inputNode)\n\t\t\t\t},\n\t\t\t\tthis.intervalTime,\n\t\t\t\tthis,\n\t\t\t\tinputNode,\n\t\t\t\tadd\n\t\t\t)\n\t\t}\n\n\t\treturn null\n\t}\n\n\treset() {\n\t\tif (this.node) {\n\t\t\tthis.node.valueAsNumber = this.default\n\t\t\tthis.current = this.default\n\t\t\tthis.setVisibleValue(this.node)\n\t\t}\n\t}\n\n\tsetVisibleValue(node) {\n\t\tnode.parentNode.parentNode.firstElementChild.querySelectorAll(\n\t\t\t'span'\n\t\t)[1].innerText = node.value\n\t}\n}\n\n\n//# sourceURL=webpack://whatsthebeat/./src/workshops/input.js?");

/***/ }),

/***/ "./src/workshops/pagePainter.js":
/*!**************************************!*\
  !*** ./src/workshops/pagePainter.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PagePainter\": function() { return /* binding */ PagePainter; }\n/* harmony export */ });\nclass PagePainter {\n\tconstructor(actions, nav) {\n\t\tlet pages = document.querySelectorAll('[route]')\n\t\tlet a = document.createElement('A')\n\t\tthis.pages = []\n\t\tthis.actions = actions\n\t\tthis.mainTitle = 'Tuner'\n\n\t\tthis.regex = /_/g\n\t\tfor (let page of pages) {\n\t\t\tif (page.hasAttribute('home')) {\n\t\t\t\tthis.pages['home'] = page\n\t\t\t} else {\n\t\t\t\tthis.pages[page.id] = page\n\t\t\t\tif (page.id !== 'error') {\n\t\t\t\t\ta.href = '/' + page.id\n\t\t\t\t\ta.innerText = page.id.replace(this.regex, ' ')\n\t\t\t\t\tnav.appendChild(a.cloneNode(true))\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\tdrawNewPage(mainNodes, workshops) {\n\t\tlet id = ''\n\t\tlet route = window.location.pathname.slice(1)\n\n\t\tif (!route) {\n\t\t\troute = 'home'\n\t\t} else if (!this.pages[route]) {\n\t\t\troute = 'error'\n\t\t\tid = 'error'\n\t\t} else {\n\t\t\tid = route\n\t\t}\n\t\tthis.setRobotsMeta(route)\n\t\tthis.draw(mainNodes.main, this.pages[route].content)\n\n\n\t\tmainNodes.title.innerText = this.setTitle(id, this.regex)\n\n\t\tlet action = this.actions[id]\n\t\tif (action === undefined) {\n\t\t\taction = this.actions[this.pages['home'].id]\n\t\t}\n\n\t\tworkshops.init(mainNodes.main)\n\n\t\tif (action) {\n\t\t\treturn action.prototype\n\t\t}\n\t\treturn action\n\t}\n\n\tsetTitle(id, regex) {\n\t\tif (!id) {\n\t\t\treturn this.mainTitle\n\t\t} else if (this.pages[id]) {\n\t\t\treturn id.replace(regex, ' ')\n\t\t}\n\t\treturn 'error'\n\t\t\n\t}\n\n\tdraw(main, content) {\n\t\tfor (let node of content.children) {\n\t\t\tmain.appendChild(document.importNode(node, true))\n\t\t}\n\t}\n\n\tsetRobotsMeta(route) {\n\t\tlet meta = document.head.querySelector('meta[name=robots]')\n\t\tlet metaRobots = document.createElement('meta');\n\n\t\tif (meta) {\n\t\t\tdocument.head.removeChild(meta)\n\t\t}\n\t\tmetaRobots.name = 'robots';\n\t\tif (route === 'error') {\n    \t\tmetaRobots.content = 'noindex';\n\t\t}\n\t\tdocument.head.appendChild(metaRobots);\n\t}\n\n\treset() {}\n}\n\n\n//# sourceURL=webpack://whatsthebeat/./src/workshops/pagePainter.js?");

/***/ }),

/***/ "./src/workshops/select.js":
/*!*********************************!*\
  !*** ./src/workshops/select.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Select\": function() { return /* binding */ Select; }\n/* harmony export */ });\n/* harmony import */ var _input_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input.js */ \"./src/workshops/input.js\");\n\n\nclass Select extends _input_js__WEBPACK_IMPORTED_MODULE_0__.Input {\n\tconstructor(value) {\n\t\tsuper(value)\n\t\tthis.currentValueAsNumber = 0\n\t}\n\n\tmodifyValue(select, add) {\n\t\tlet i = 0\n\t\tlet node = null\n\n\t\twhile ((node = select.children[i])) {\n\t\t\tif (select.value === node.value) {\n\t\t\t\tlet selection = (i + add) % select.children.length\n\t\t\t\tif (selection < 0) {\n\t\t\t\t\tselection += select.children.length\n\t\t\t\t\tif (this.target) {\n\t\t\t\t\t\tlet event = new Event('input', { bubbles: true })\n\t\t\t\t\t\tthis.target.minus.dispatchEvent(event)\n\t\t\t\t\t}\n\t\t\t\t} else if ((i + add) / select.children.length >= 1) {\n\t\t\t\t\tif (this.target) {\n\t\t\t\t\t\tlet event = new Event('input', { bubbles: true })\n\t\t\t\t\t\tthis.target.plus.dispatchEvent(event)\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tthis.currentValueAsNumber = selection\n\t\t\t\tselect.value = select.children[selection].value\n\n\t\t\t\tbreak\n\t\t\t}\n\t\t\ti++\n\t\t}\n\n\t\treturn select.value\n\t}\n\n\treset() {\n\t\tif (this.node) {\n\t\t\tthis.node.value = this.default\n\t\t\tthis.current = this.default\n\t\t\tthis.modifyValue(this.node, 0)\n\t\t\tthis.setVisibleValue(this.node)\n\t\t}\n\t}\n}\n\n\n//# sourceURL=webpack://whatsthebeat/./src/workshops/select.js?");

/***/ }),

/***/ "./src/workshops/workshopIndex.js":
/*!****************************************!*\
  !*** ./src/workshops/workshopIndex.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Select\": function() { return /* reexport safe */ _select_js__WEBPACK_IMPORTED_MODULE_0__.Select; },\n/* harmony export */   \"Audio\": function() { return /* reexport safe */ _audio_js__WEBPACK_IMPORTED_MODULE_1__.Audio; },\n/* harmony export */   \"Input\": function() { return /* reexport safe */ _input_js__WEBPACK_IMPORTED_MODULE_2__.Input; },\n/* harmony export */   \"Beat\": function() { return /* reexport safe */ _beat_js__WEBPACK_IMPORTED_MODULE_3__.Beat; },\n/* harmony export */   \"PagePainter\": function() { return /* reexport safe */ _pagePainter_js__WEBPACK_IMPORTED_MODULE_4__.PagePainter; }\n/* harmony export */ });\n/* harmony import */ var _select_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./select.js */ \"./src/workshops/select.js\");\n/* harmony import */ var _audio_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./audio.js */ \"./src/workshops/audio.js\");\n/* harmony import */ var _input_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./input.js */ \"./src/workshops/input.js\");\n/* harmony import */ var _beat_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./beat.js */ \"./src/workshops/beat.js\");\n/* harmony import */ var _pagePainter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pagePainter.js */ \"./src/workshops/pagePainter.js\");\n\n\n\n\n\n\n\n//# sourceURL=webpack://whatsthebeat/./src/workshops/workshopIndex.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;