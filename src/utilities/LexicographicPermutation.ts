export default function LexicographicPermutation(toPermut: string): string {
    if (toPermut.length === 1) return toPermut

    let indexK = -1
    let indexI = -1

    for (let i = 0; i < toPermut.length - 1; i++) {
        if (Number(toPermut[i]) < Number(toPermut[i + 1])) indexK = i
    }

    if (indexK === -1) return toPermut

    for (let i = indexK + 1; i <= toPermut.length; i++) {
        if (Number(toPermut[indexK]) < Number(toPermut[i])) indexI = i
    }

    const targetK = toPermut[indexK]
    const targetI = toPermut[indexI]
    toPermut = toPermut.replace(targetK, 'K')
    toPermut = toPermut.replace(targetI, targetK)
    toPermut = toPermut.replace('K', targetI)
    
    const savePermut = toPermut
    toPermut = ''


    for (let i = 0; i < savePermut.length; i++) {
        if (i <= indexK) {
            toPermut += savePermut[i]
        } else {
            toPermut += savePermut[savePermut.length + indexK - i]
        }
    }

    return toPermut 
}
