import Suite_1 from './suites/1'
import Suite_2 from './suites/2'
import Suite_3 from './suites/3'
import Suite_4 from './suites/4'
import Suite_5 from './suites/5'
import Suite_6 from './suites/6'
import Suite_7 from './suites/7'
import Suite_8 from './suites/8'
import Suite_9 from './suites/9'
import Suite_10 from './suites/10'

export interface Suite {
    summary: string
    problem: number
    solution: Function 
}

// List all suites
// TODO: dynamic file load
const suites: { [index: number]: Suite } = {
    1: Suite_1,
    2: Suite_2,
    3: Suite_3,
    4: Suite_4,
    5: Suite_5,
    6: Suite_6,
    7: Suite_7,
    8: Suite_8,
    9: Suite_9,
    10: Suite_10,
}

export default suites
