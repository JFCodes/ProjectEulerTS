import { Suite } from './suites'

interface Execution {
    startTime: number,
    endTime: number,
    duration: number,
    success: boolean,
    result: null | number | string
}

class runner {
    suites: { [index: number]: Suite }

    constructor (suites: { [index: number]: Suite }) {
       this.suites = suites 
    }

    async execute (problem: number): Promise<Execution> {
        const suite = this.suites[problem]

        if (!suite) throw new Error('[RUNNER]: could not find target suite')

        // Initiate execution object
        let execution: Execution = {
            startTime: Date.now(),
            endTime: Infinity,
            duration: Infinity,
            success: false,
            result: null
        }
        // Run suite
        try {
            execution.result = await suite.solution()
        } catch(e) {
            // return the execution object as is
            return execution
        }
        // Process times and success flag and return execution object        
        execution.endTime = Date.now()
        execution.duration = execution.endTime - execution.startTime
        execution.success = true

        return execution
    }
}

export default runner
