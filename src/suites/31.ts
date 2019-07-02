import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 31
    }

    public async solution (): Promise<number | string> {
        // Start counting the 2Pound coin being one of the solutions
        let result = 1
        
        const LIMIT = 200

        for (let cent5 = 0; cent5 <= LIMIT; cent5 += 5) {
            for (let cent10 = 0; cent10 <= LIMIT; cent10 += 10) {
                for (let cent20 = 0; cent20 <= LIMIT; cent20 += 20) {
                    for (let cent50 = 0; cent50 <= LIMIT; cent50 += 50) {
                        for (let cent100 = 0; cent100 <= LIMIT; cent100 += 100) {
                            let total = cent5 + cent10 + cent20 + cent50 + cent100
                            if (total <= LIMIT) {
                                // If there is a remainder, for the remainder there are remainder / 2 + 1
                                // solutions using 1p and 2p coins
                                result += Math.floor(((LIMIT - total) / 2)) + 1
                            }
                        }
                    }
                }
            }
        }

        return result
    }
}

export default new suite()
