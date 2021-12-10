export default function getFactorial(target: number): number {
    if (target === 1) return 1
    return  target * getFactorial(target - 1)
}
