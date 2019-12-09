import { Suite } from '../suites'
import isPandigital from '../utilities/isPandigital'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 32
    }

    public async solution (): Promise<number | string> {
        let result = 0
        
        // TODO: justify why 9999 is a sensible limit
        const LIMIT = 9999
        const PANDIGITAL_TARGET = 9
        const MEMOIZE = {}

        // Given productA to 9999, evaluate productA * productB
        for (let productA = 1; productA <= LIMIT; productA++) {
            let checkstring = ''
            let productB = 0

            do {
                productB++
                const product = productA * productB
                checkstring = `${productA}${productB}${product}`

                if (isPandigital(PANDIGITAL_TARGET, checkstring) && !MEMOIZE[product]) {
                    result += product
                    MEMOIZE[product] = true
                }
            } while (checkstring.length <= PANDIGITAL_TARGET)
        }

        return result
    }
}

export default new suite()
