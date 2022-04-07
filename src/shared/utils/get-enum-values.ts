export const getEnumValues = <T extends object, K extends keyof T>(obj: T): T[K][] => Object.values(obj);
