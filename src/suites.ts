import * as fs from 'fs'

export interface Suite {
    summary: string
    problem: number
    solution: Function 
}

const suites: { [index: number]: Suite } = {}

// Scan suites dir
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
