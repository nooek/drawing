import express from "express"
import HttpAdapter from "../adapters/httpAdapter"
import { createMatchController } from "../controllers/match/index"
const matchRoutes = express.Router()

const createAdapter = new HttpAdapter(createMatchController).adapt()
matchRoutes.post("/", createAdapter)

export default matchRoutes
