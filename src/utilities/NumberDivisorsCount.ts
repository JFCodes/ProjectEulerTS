export default function NumberDivisorsCount(targetNumber: number) {

    const LIMIT: number = Math.ceil(Math.sqrt(targetNumber))
    const vector: number[] = []
    let remainder: number = targetNumber
    let semiRemainder: number = 0
    let numberOfDivisors = 1

    while (remainder > 1) {
        semiRemainder = remainder

        for(let i = 2; i <= LIMIT; i++) {
            if (remainder % i === 0) {
                if (!vector[i]) vector[i] = 0
                vector[i]++
                remainder = remainder / i
                break
            }
        }

        if (remainder === semiRemainder) {
            remainder = 1;
            vector[0] = 1
        }
    }

    for (let i = 0; i <= LIMIT; i++) {
        if (vector[i] > 0) numberOfDivisors *= (vector[i] + 1)
    }

    return numberOfDivisors
}
