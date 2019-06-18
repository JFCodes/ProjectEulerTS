import { Suite } from '../suites'

class suite implements Suite {
    problem: number
    summary: string

    constructor () {
        this.problem = 15
        this.summary = `
        Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.
        How many such routes are there through a 20×20 grid?
        `
    }

    public solution (): number | string {
        let result = 0
        
        const SIDE = 20
        const getIndex = (line: number, column: number): string => {
            return `${line}_${column}`
        }
        const gridPaths = {}

        // Initiate all grid positions with value 1
        for (let line = 0; line <= SIDE; line++) {
            for (let column = 0; column <= SIDE; column++) {
                gridPaths[getIndex(line, column)] = 1
            }            
        }

        // Propagate the value of each positon to the adjacent
        for (let line = 1; line <= SIDE; line++) {
            for (let column = 1; column <= SIDE; column++) {
                let leftPosition = gridPaths[getIndex(line - 1, column)]
                let abovePosition =gridPaths[getIndex(line, column - 1)]
                
                gridPaths[getIndex(line, column)] = leftPosition + abovePosition 
            }            
        }

        result = gridPaths[getIndex(SIDE, SIDE)]
        return result
    }
}

export default new suite()
