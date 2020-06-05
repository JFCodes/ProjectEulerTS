import { Suite } from '../suites'
import StringPower from '../utilities/StringPower'
import SumOfDigits from '../utilities/sumOfDigits'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 56
    }

    public async solution (): Promise<number | string> {
        let result = 0

        const BASE_LIMIT = 100
        const POWER_LIMIT = 100
        // Find a sensible justification for the search domain

        // NOTE: STOPAGE RULE JUSTIFICATION
        // Start iterating from top to bottom
        // Calculate the max number of digits a power generates
        // Assume that:
        //  1. Next lower power cannot generate more digits
        //  2. All those digits could be hypothically 9
        // If the sum of those is not greater then the current result
        // then, no other lower power can generate a sum of digits greater
        // then the one already found.

        for (let power = POWER_LIMIT; power > 0; power--) {
            let maxPowerDigitCount = 0;
            for (let base = BASE_LIMIT; base > 0; base--) {
                let powerString: string = StringPower(base, power)
                let digitSum: number = SumOfDigits(powerString)
                if (digitSum > result) result = digitSum
                if (base === BASE_LIMIT) maxPowerDigitCount = powerString.length
            }
            // Test if the next (lower) power can be generate a sum of digits
            // greater then the current result
            if (maxPowerDigitCount * 9 < result) return result
        }

        return result
    }
}

export default new suite()
