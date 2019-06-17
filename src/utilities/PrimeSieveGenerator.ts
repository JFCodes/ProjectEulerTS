// Return an array where each index i
// is true if i is prime, false otherwise

class PrimeSieveGenerator {
    UPPERBOUND: number
    primeArray: boolean[]

    constructor (upperbound: number) {
        this.UPPERBOUND = upperbound
        this.primeArray = []

        this.generate()
    }

    public isPrime (test: number) {
        if (test >= this.primeArray.length ) {
            console.warn(`Test number '${test}' over UPPERBOUND limit of '${this.UPPERBOUND}'`)
        }
        return this.primeArray[test]
    }

    public getPrimesArray (limit: number): number[] {
        if (limit >= this.primeArray.length) {
            console.warn(`Limit '${limit}' is higher then UPPERBOUND limit of '${this.UPPERBOUND}'`)
        }
        let numberPrimeArray = []
        for (let index = 1; index <= limit; index++) {
            if (this.primeArray[index]) numberPrimeArray.push(index)
        } 
        return numberPrimeArray
    }
    public getTHPrime (position: number): number {
        if (position >= this.primeArray.length) {
            console.warn(`Target '${position}th' is higher then UPPERBOUND limit of '${this.UPPERBOUND}'`)
        }
        
        let counter = 0
        // 1 is not prime (for project euler at least)
        // start at 2
        for (let i = 2; i <= this.UPPERBOUND; i++) {
            if (this.primeArray[i]) counter++
            if (counter === position) return i
        }
        console.warn(`Could not find '${position}th' prime in the UPPERBOUND limit of '${this.UPPERBOUND}'`)
        return 0
    }

    private generate () {
        // Implements the prime sieve generator algorithm
        
        // Initiate the array
        for (let index = 0; index <= this.UPPERBOUND; index++) {
            this.primeArray[index] = true
        }
        // Cicle multitples
        for (let index = 2; index <= this.UPPERBOUND; index++) {
            for(let multiple = 2 * index; multiple <= this.UPPERBOUND; multiple += index) {
                this.primeArray[multiple] = false
            }
        }
    }
}

export default PrimeSieveGenerator