import { Suite } from '../suites'

import { ReadFromFile } from '../utilities/fsPromises'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 42
    }
    
    private isTriangleNumber(triangular: number): boolean {
        // Solve (n (n + 1)) / 0.5 = T, to n
        // And it gives n = ((1 + 8T) ^ 2 - 1) / 2
        // T is triangular if n is integer
        let term = (Math.sqrt(1 + (8 * triangular)) - 1) / 2
        return term % 1 === 0
    }

    public async solution (): Promise<number | string> {
        let result = 0

        const WORDS_FILE = await ReadFromFile({ fileName: 'src/files/42.txt'})
        const WORDS = WORDS_FILE.split(',').sort()

        WORDS.forEach(word => {
            let wordNumber = 0

            word.split('').forEach(letter => {
                if (letter === '"') return
                wordNumber += letter.charCodeAt(0) - 64
            })

            if (this.isTriangleNumber(wordNumber)) result++
        })

        return result
    }
}

export default new suite()
