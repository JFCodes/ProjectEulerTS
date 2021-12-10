import stringSum from '../utilities/string-sum'
import { Suite } from '../suites'

type Fraction = {
    numerator: string
    denominator: string
}

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 57
    }

    public async solution (): Promise<number | string> {
        let result = 0
        const EXPANSIONS = 1000

        // Notes: the square root of 2 expansion produces fractions that do
        // not have any common denominator
        let fraction: Fraction = {
            numerator: '1',
            denominator: '2'
        }
        for(let expansion = 1; expansion < EXPANSIONS; expansion++) {
            const denominatorTimesTwo = stringSum(fraction.denominator, fraction.denominator);
            const denominator = stringSum(fraction.numerator, denominatorTimesTwo)
            // Flip numerator -> denominator for next iteration
            fraction = {
                numerator: fraction.denominator,
                denominator
            }

            if (checkExpansionDigits(fraction)) result++
        }

        return result;
    }
}

function checkExpansionDigits(fraction: Fraction): boolean {
    const newNumerator = stringSum(fraction.numerator, fraction.denominator)
    return newNumerator.length > fraction.denominator.length
}

export default new suite()
