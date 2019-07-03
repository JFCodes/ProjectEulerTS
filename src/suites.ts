import * as fs from 'fs'

export interface Suite {
    problem: number
    solution: Function 
}

const suites: { [index: number]: Suite } = {}

// Scan suites directory
fs.readdirSync(__dirname + '/suites').forEach(file => {
    if (file.match(/\.ts$/) !== null) {

        const suiteId = Number(file.replace('.ts', ''))
        if (!suiteId || isNaN(suiteId)) return

        try {
            const suite = require('./suites/' + file)
            suites[suiteId] = suite.default
        } catch(e) {
            console.log('error requiring suite: ', suiteId)
            return
        }
    }
})

export default suites
