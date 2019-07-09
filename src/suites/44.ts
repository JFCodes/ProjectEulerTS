import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 44
    }

    public async solution (): Promise<number | string> {
        let result = 0
        
        let seed = 0

        while (result === 0) {
            seed++

            for (let i = seed; i > 0; i--) {
                let diference = (Math.sqrt(1 + 12 * (3 * (Math.pow(seed, 2) - Math.pow(i, 2)) - seed + i)) + 1) / 6
                if (diference % 1 !== 0) continue

                let sum = (Math.sqrt(1 + 12 * (3 * (Math.pow(seed, 2) + Math.pow(i, 2)) - seed - i)) + 1) / 6
                if (sum % 1 !== 0) continue

                result = ((seed * ((3 * seed) - 1) / 2) - (i * ((3 * i) - 1) / 2))
            }
        }

        return result
    }
}

export default new suite()
