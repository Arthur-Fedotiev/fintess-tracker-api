import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    debug: true,
    path: path.resolve(__dirname, '../', 'config', 'config.env'),
})

export const CONFIG = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
}
