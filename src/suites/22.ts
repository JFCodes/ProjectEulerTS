import { Suite } from '../suites'
import { ReadFromFile } from '../utilities/fs-promises'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 22
    }

    public async solution (): Promise<number | string> {
        let result = 0

        const NAMES_FILE = await ReadFromFile({ fileName: 'src/files/22.txt'})
        const NAMES = NAMES_FILE.split(',').sort()

        NAMES.forEach((name, index) => {
            let wordScore = 0
            name.split('').forEach(letter => {
                if (letter === '"') return
                wordScore += letter.charCodeAt(0) - 64
            })
            result += wordScore * (index + 1)
        })

        return result
    }
}

export default new suite()
