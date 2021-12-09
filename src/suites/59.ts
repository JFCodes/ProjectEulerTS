import * as fs from 'fs'
import { Suite } from '../suites'

class suite implements Suite {
    problem: number

    constructor () {
        this.problem = 59
    }

    public async solution (): Promise<number | string> {
        let result = 0

        const cypher = fs.readFileSync('./src/files/59.txt', 'utf-8')
        const cypherNumbers = cypher.split(',').map(n => Number(n))
        const SEARCH_FOR = 'the'
        let searchForMaxCount = 0

        for (let keyChar1 = 97; keyChar1 < 123; keyChar1++) {
            for (let keyChar2 = 97; keyChar2 < 123; keyChar2++) {
                for (let keyChar3 = 97; keyChar3 < 123; keyChar3++) {
                    let decyphered = deCypher(cypherNumbers, [keyChar1, keyChar2, keyChar3])
                    let phrase = decyphered.reduce((acc, n) => acc + String.fromCharCode(n), '')
                    
                    const searchForCount = phrase.toLowerCase().split(SEARCH_FOR).length - 1
                    if (searchForCount > searchForMaxCount) {
                        searchForMaxCount = searchForCount
                        result = decyphered.reduce((acc, n) => acc + n, 0)
                    }
                }            
            }   
        }

        return result
    }
}

function deCypher(numberArray: Array<number>, key: Array<number>): Array<number> {
    const keyLength = key.length
    return numberArray.map((n, index) => n ^ key[index % keyLength])
}

export default new suite()
