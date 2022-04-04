import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import { getDirName } from './utils/path/dirName.mjs'

/**
 * Load environment variables
 */
dotenv.config({
    path: path.join(getDirName(import.meta.url), 'config', 'config.env'),
})

const app = express()

const PORT = process.env.PORT || 8080

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
    )
)
