
function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const generateRandomString = (length: number) => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

const enumKeyFromValue = <T>(enumz: any, value: string) => {
    const indexOfS = Object.values(enumz).indexOf(value as unknown as T);

    return Object.keys(enumz)[indexOfS];
}

const randomEnumValue = (enumeration: any) => {
    const values = Object.keys(enumeration)
    const enumKey = values[Math.floor(Math.random() * values.length)]
    return enumeration[enumKey]
}
const getRandomInt = (maxInt: number, minInt: number) => {
    const min = Math.ceil(minInt)
    const maxNum = Math.floor(maxInt)
    const numRturn = Math.floor(Math.random() * (maxNum - min) + min)
    return numRturn
}

const wairForNotNull = async <T>(func: () => Promise<T>, retries: number, timeOut: number): Promise<T> => {
    let result = await func()
    while (!result && retries >= 0) {
        await delay(timeOut)
        result = await func()
        retries--
    }
    return result
}
const waitForNotEmptyArray = async <T>(func: () => Promise<T[]>, retries: number, timeOut: number): Promise<T[]> => {
    let result = await func()
    while (result.length == 0 && retries >= 0) {
        await delay(timeOut)
        result = await func()
        retries--
    }
    return result
}

export {
    generateRandomString,
    randomEnumValue,
    getRandomInt,
    wairForNotNull,
    waitForNotEmptyArray,
    enumKeyFromValue,
    delay
}