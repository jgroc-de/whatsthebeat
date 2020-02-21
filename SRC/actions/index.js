/**
 * to declare a new page
 * add a line below
 * exemple:
 *  export { ClassName as urlhash } from 'myfile.js'
 *
 * where classname is the class you want tu use
 * urlhash = is the hash name of the url you want to match
 *      no need to write the '#' for your url as in #myurl
 *      because it will be remove by the factory
 * and myfile.js the path of the file where the class is
 */

export { BeatTaker as wtb } from './beatTaker.js'
export { Metronome as metronome } from './metronome.js'
export { Tuner as tuner } from './tuner.js'
