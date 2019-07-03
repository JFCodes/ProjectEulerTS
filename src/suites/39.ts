import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 39
    }
    
    public async solution (): Promise<number | string> {
        let result = 0

        // TODO: find better side limits according to predicting that the perimeter is less then 1000
        const MAX_PERIMETER = 1000
        const SIDE_LIMIT = MAX_PERIMETER / 2
        const perimeterCount = []
        let maxCount = 0

        for (let sideA = 1; sideA <= SIDE_LIMIT; sideA++) {
            for (let sideB = 1; sideB <= SIDE_LIMIT; sideB++) {
                const sideC = Math.sqrt((sideA * sideA) + (sideB * sideB))
                if (sideC % 1 !== 0) continue
                const perimeter = sideA + sideB + sideC
                if (perimeter > MAX_PERIMETER) continue
                if (!perimeterCount[perimeter]) perimeterCount[perimeter] = 0
                perimeterCount[perimeter]++
            }   
        }

        // Note that perimeters counter will be duplicated
        // because of permutations of sideA with sideB
        // but since we only want the perimeter with more unique solutions, it does not matter

        perimeterCount.forEach((count, perimeter) => {
            if (count > maxCount) {
                result = perimeter
                maxCount = count
            }
        })

        return result
    }
}

export default new suite()
