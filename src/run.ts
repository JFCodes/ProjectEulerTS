import suites from './suites'
import runner from './runner'

const runnerInstance = new runner(suites)
const problem = 16

const suiteExecution =  runnerInstance.execute(problem)

// TODO: get the problem to execute from the command line
if (suiteExecution.success) {
    console.log(`[RUN]: Executed ${problem} in ${suiteExecution.duration} ms with result ${suiteExecution.result}`)
} else {
    console.log(`[RUN]: Failed to execute problem ${problem}`)
}
