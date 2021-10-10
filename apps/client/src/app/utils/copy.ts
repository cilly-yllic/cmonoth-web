export const getDeepCopy = <T = any>(data: T): T => JSON.parse(JSON.stringify(data))
