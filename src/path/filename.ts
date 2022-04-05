import { fileURLToPath } from 'url'

export const getFileName = (url: string): string => fileURLToPath(url)
