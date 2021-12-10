import * as fs from 'fs'

export const WriteToFile = ({ fileName, content }: { fileName: string, content: string }): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        fs.writeFile(fileName, content, (error) => {
            error ? reject(error) : resolve(true)
        })
    })
}

export const ReadFromFile = ({ fileName }: { fileName: string }): Promise<string> => {
    return new Promise( (resolve, reject) => {
        fs.readFile(fileName, 'utf8', (error, contents) => {
            error ? reject(error) : resolve(contents.toString())
        })
    })
}

export const DeleteFile = ({ fileName }: { fileName: string }): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        fs.unlink(fileName, (error) => {
            error ? reject(false) : resolve(true)
        })
    })
}

export const ReadFromFileAsync = ({fileName}) => {
    return fs.readFileSync(fileName, 'utf8')
}

export const CreateDirectoty = ({ dirPath }: { dirPath: string }): void => {
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath)
}
