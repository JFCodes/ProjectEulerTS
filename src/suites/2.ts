import { Suite } from '../suites'

class suite implements Suite {
    problem: number
    summary: string

    constructor () {
        this.problem = 2
    }

    public solution (): number | string {
        let result = 0

        const LIMIT = 4000000 // Four million

        let position_1: number = 0
        let position_2: number = 0
        let currentNumber: number = 1

        const generator = () => {
            position_1 = position_2
            position_2 = currentNumber || 1
            currentNumber = position_1 + position_2
        }
        
        do {
            generator()
            if (currentNumber % 2 === 0) result += currentNumber
        } while (currentNumber < LIMIT)
        
        return result
    }
}

export default new suite()
