import suites from './suites'
import runner from './runner'

const runnerInstance = new runner(suites)
const invalidArg = () => {
    console.log(`[RUN]: Invalid problem input`)
    process.exit()
}
let problem: number | string = process.argv[2]

if (!problem) invalidArg()

if (problem.toLowerCase() === 'all') {
    runnerInstance.executeAll()
} else {
    problem = Number(problem)
    if (isNaN(problem)) invalidArg()
    runnerInstance.execute(problem)
}
