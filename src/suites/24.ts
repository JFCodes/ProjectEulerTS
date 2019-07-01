import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 24
    }

    public async solution (): Promise<number | string> {
        let result = ''

        let sequenceString = "0123456789"
        let iterations = 999999 // counting to zero, this is 1million iterations
        let counter = 9
        let factorial: number
        let position: number
        let digit: string

        while (counter !== 0) {
            factorial = 1
            for(let i = 1; i <= counter; i++) {
                factorial = factorial * i
            }

            position = 0
            while (position * factorial <= iterations) {
                position += 1
            }
            position = position - 1

            digit = sequenceString[position]
            result += digit
            sequenceString = sequenceString.replace(digit, '')
            iterations = iterations - factorial * position

            counter--
        }
        // left over
        result += sequenceString

        return result
    }
}

export default new suite()
