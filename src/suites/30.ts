import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 30
    }

    public async solution (): Promise<number | string> {
        let result = 0

        // Finding the sensible limit
        let digits = 1
        let digitContribution = Math.pow(9, 5)
        let UPPER_LIMIT = digitContribution
        while (String(UPPER_LIMIT).length > digits) {
            digits++
            UPPER_LIMIT += digitContribution
        }

        for (let candidate = 2; candidate <= UPPER_LIMIT; candidate++) {
            const candidateString = String(candidate)

            let powerSum = candidateString.split('').reduce((sum, position) => {
                let charNumber = Number(position)
                sum += Math.pow(charNumber, 5)
                return sum
            }, 0)

            if (powerSum === candidate) result += candidate
        }

        return result
    }
}

export default new suite()
