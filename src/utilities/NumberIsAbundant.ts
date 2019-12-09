export default function isAbundant(target: number): boolean {
    let sumOfDivisors = 1

    for (let i = 2; i <= Math.sqrt(target); i++) {
        if (target % i === 0) {
            sumOfDivisors += i
            const simetricDivisor = target / i
            if (simetricDivisor !== i) sumOfDivisors += simetricDivisor

            if (sumOfDivisors > target) return true
        }
    }

    return false
}
