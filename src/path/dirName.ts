import { getFileName } from './filename'
import path from 'path'

export const getDirName = (url: string): string =>
    path.dirname(getFileName(url))
