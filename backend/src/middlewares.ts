import express, { Router } from "express"
import cors from "cors"
const middlewares = Router()

middlewares.use(cors())
middlewares.use(express.json())
middlewares.use(express.urlencoded({ extended: true }))

export default middlewares
