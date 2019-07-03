import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 33
    }

    public async solution (): Promise<number | string> {
        let result = 0

        // Brain fart comming up
        let denominatorProduct = 1
        let numeratorProduct = 1

        // Consider C as the cancellingDigit
        // Its proven that the only form for the valid condition is:
        // nC / Cd

        // Lets consider the cancelling digit.
        // Since we are removing it, we want to repeat the digit on the numerator and denominator
        for (let cancelingDigit = 1; cancelingDigit <= 9; cancelingDigit++) {


            for (let denominator = 1; denominator < cancelingDigit; denominator++) {
                // Only loop nominators < denominators
                for (let numerator = 1; numerator < denominator; numerator++) {
                    // The condition is basically saying:
                    // 10 * numerator + C / C * 10 + denominator === numerator / denominator
                    // So, (10 * numerator + C) * denominator === (C * 10 + denominator) * numerator
                    // Putting into code:
                    const testNumerator = ((numerator * 10) + cancelingDigit) * denominator
                    const testDenominator = numerator * ((cancelingDigit * 10) + denominator)
                    if (testNumerator === testDenominator) {
                        numeratorProduct = numeratorProduct * numerator
                        denominatorProduct = denominatorProduct * denominator
                    }
                }
            }
        }

        // Assumes the fraction inverse is an integer
        result = denominatorProduct / numeratorProduct
        return result
    }
}

export default new suite()
