import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 28
    }

    public async solution (): Promise<number | string> {
        let result = 1 // Start with center position already counted

        const SIDES = 1001
        const RINGS = ((SIDES - 1) / 2) + 1

        let transport: number = 1

        for(let i = 2; i <= RINGS; i++) {
            let step = 2 * (i - 1)

            let corner1 = transport + step
            let corner2 = corner1 + step
            let corner3 = corner2 + step
            let corner4 = corner3 + step

            transport = corner4
            result += corner1 + corner2 + corner3 + corner4
        }

        return result
    }
}

export default new suite()
