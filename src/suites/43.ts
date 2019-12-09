import { Suite } from '../suites'
import LexicographicPermutation from '../utilities/LexicographicPermutation'
import OnlyUniques from '../utilities/OnlyUniques'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 43
    }

    public async solution (): Promise<number | string> {
        let result = 0

        const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
        const DIVISORS = [2, 3, 5, 7, 11, 13, 17]
        const multiples17 = []

        // Gather all 3 digit numbers that will be divisable by one of the divisors
        for (let candidate = 17; candidate < 1000; candidate = candidate + 17) {
            let candidateString = String(candidate)
            if (candidate < 100) candidateString = `0${candidateString}`
            if (!OnlyUniques(candidateString)) continue
            multiples17.push(candidateString)

        }

        for (let multiple of multiples17) {
            let savePermutation: string = ''
            let testPermutation = DIGITS.reduce((acc: string, digit: string): string => {
                if (multiple.indexOf(digit) === -1) acc += digit
                return acc
            }, '')
            
            do  {
                let fullNumber = `${testPermutation}${multiple}`
                let canDivide = true

                // We can ignore the last, 17, test because we already know its divisible
                for (let divisorIndex = 0; divisorIndex < DIVISORS.length - 1; divisorIndex++) {
                    if (Number(fullNumber.substr(divisorIndex + 1, 3)) % DIVISORS[divisorIndex] !== 0) {
                        canDivide = false
                        break
                    }
                }

                if (canDivide) result += Number(fullNumber)
                savePermutation = testPermutation
                testPermutation = LexicographicPermutation(testPermutation)

            } while (savePermutation !== testPermutation)
        }
        
        return result
    }
}

export default new suite()
