import { Suite } from '../suites'
import stringPower from '../utilities/string-power'
import SumOfDigits from '../utilities/sum-of-digits'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 56
    }

    public async solution (): Promise<number | string> {
        let result = 0

        const BASE_LIMIT = 100
        const POWER_LIMIT = 100
        // Check https://projecteuler.net/action=redirect;post_id=288
        // for lower bound limits
        const BASE_LOWER_BOUND = 90
        const POWER_LOWER_BOUND = 90
        // Find a sensible justification for the search domain

        for (let power = POWER_LIMIT; power > POWER_LOWER_BOUND; power--) {
            let maxPowerDigitCount = 0;
            console.log('power: ', power)
            for (let base = BASE_LIMIT; base > BASE_LOWER_BOUND; base--) {
                let powerString: string = stringPower(base, power)
                let digitSum: number = SumOfDigits(powerString)
                if (digitSum > result) result = digitSum
                if (base === BASE_LIMIT) maxPowerDigitCount = powerString.length
            }
        }

        return result
    }
}

export default new suite()
