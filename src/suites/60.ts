import isPrime from '../utilities/is-prime'
import PrimeSieveGenerator from '../utilities/prime-sieve-generator'
import { Suite } from '../suites'

const PRIME_LIMIT = 9999

class suite implements Suite {
    problem: number
    primeSieve: PrimeSieveGenerator

    constructor () {
        this.problem = 60
        this.primeSieve = new PrimeSieveGenerator(PRIME_LIMIT)
    }

    public async solution (): Promise<number | string> {
        let result = Infinity

        const primeArray = this.primeSieve.getPrimesArray(PRIME_LIMIT)
        const primeArrayLength = primeArray.length
        let primePairs: { [index: number]: Array<number> } = []

        for(let p1 = 0; p1 < primeArrayLength; p1++) {
            const prime1 = primeArray[p1]
            primePairs[prime1] = []
            
            for(let p2 = p1 + 1; p2 < primeArrayLength; p2++) {
                const prime2 = primeArray[p2]

                const pair = Number(String(prime1) + String(prime2));
                const reversePair = Number(String(prime2) + String(prime1));
                
                if (isPrime(pair) && isPrime(reversePair)) {
                    primePairs[prime1].push(prime2);
                }
            }
        }

        for (let prime in primePairs) {
            const prime1 = Number(prime)
            const prime1Pairs = primePairs[prime1]

            for(let prime2 of prime1Pairs) {
                const prime2Pairs = primePairs[prime2]
                    .filter(candidate => {
                        if (prime1Pairs.indexOf(candidate) === -1) return false
                        return true
                    })
                
                for (let prime3 of prime2Pairs) {
                    const prime3Pairs = primePairs[prime3]
                        .filter(candidate => {
                            if (prime1Pairs.indexOf(candidate) === -1) return false
                            if (prime2Pairs.indexOf(candidate) === -1) return false
                            return true
                        })

                    for (let prime4 of prime3Pairs) {
                        const prime4Pairs = primePairs[prime4]
                            .filter(candidate => {
                                if (prime1Pairs.indexOf(candidate) === -1) return false
                                if (prime2Pairs.indexOf(candidate) === -1) return false
                                if (prime3Pairs.indexOf(candidate) === -1) return false
                                return true
                            })

                            prime4Pairs.forEach(prime5 => {
                                const primeSum = prime1 + prime2 + prime3 + prime4 + prime5
                                if (primeSum < result) {
                                    result = primeSum
                                }
                            })
                    }
                }
            }
        }

        return result
    }
}

export default new suite()
