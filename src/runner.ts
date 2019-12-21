import suites, { Suite } from './suites'

interface Execution {
    startTime: number,
    endTime: number,
    duration: number,
    success: boolean,
    result: null | number | string
}

class runner {
    suites: { [index: number]: Suite }

    constructor () {
       this.suites = suites 
    }

    async executeAll () {
        for (let suite in this.suites) {
            await this.execute(Number(suite))
        }
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
            if (e.message) {
                console.log(`[RUN]: [SUITE: ${suite.problem}]: ${e.message}`)
            }
            // on error, return the execution object as is
            return execution
        }
        // Process times and success flag and return execution object
        execution.endTime = Date.now()
        execution.duration = execution.endTime - execution.startTime
        execution.success = true

        if (execution.success) {
            console.log(`[RUN]: Executed ${problem} in ${execution.duration} ms with result ${execution.result}`)
        } else {
            console.log(`[RUN]: Failed to execute problem ${problem}`)
        }

        return execution
    }
}

export default runner
