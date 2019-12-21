function factorial (subject: number): number {
    if (subject === 1 || subject === 0) return 1
    
    let result = 1
    for (let i = subject; i > 1; i--) {
        result *= i
    }
    return result
}

export default function (pool: number, draws: number): number {
    if (pool < draws) throw new Error('The number of draws cannot be greater then the pool size.')
    return factorial(pool) / (factorial(draws) * factorial(pool - draws))
}
