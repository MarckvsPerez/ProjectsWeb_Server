import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './router/auth'

dotenv.config()

const API_VERSION = process.env.API_VERSION

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('uploads'))
app.use(cors())

app.use(`/api/${API_VERSION}`, authRoutes)
export default app
