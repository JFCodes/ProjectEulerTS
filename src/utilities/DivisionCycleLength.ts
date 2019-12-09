export default function DivisionCycleLength(target: number) {
    let remainder: number = 1
    let repeating: boolean[] = []
    let cycleLength: number = 0 

    while (remainder > 0 && !repeating[remainder]) {
        repeating[remainder] = true
        remainder = (remainder * 10) % target
        cycleLength += 1
    }

    return remainder === 0 ? 0 : cycleLength
}