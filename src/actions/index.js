/**
 * to declare a new page
 * add a line below
 * exemple:
 *  export { ClassName as template_id } from 'myfile.js'
 *
 * where classname is the class you want tu use
 * urlhash = is the id name of the template matching the route you want to match
 * and myfile.js the path of the file where the class is
 */

export { BeatTaker as whats_the_beat } from './beatTaker.js'
export { Metronome as metronome} from './metronome.js'
export { Tuner as tuner} from './tuner.js'
export { Repeater as follow_my_path } from './repeater.js'
