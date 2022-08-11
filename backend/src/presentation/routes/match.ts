import express from "express"
import HttpAdapter from "../adapters/httpAdapter"
import { createMatchController, getMatchController } from "../controllers/match/index"
const matchRoutes = express.Router()

const createAdapter = new HttpAdapter(createMatchController).adapt()
matchRoutes.post("/", createAdapter)

const getByCreatorIdAdapter = new HttpAdapter(getMatchController).adapt({ method: "findByCreatorId" })
matchRoutes.get("/creatorid/:id", getByCreatorIdAdapter)
const getCreatedByCreatoridAdapter = new HttpAdapter(getMatchController).adapt({ method: "findMatchCreatedByCreatorId" })
matchRoutes.get("/created/creatorid/:id", getCreatedByCreatoridAdapter)
const getInProgressByCreatoridAdapter = new HttpAdapter(getMatchController).adapt({ method: "findMatchInProgressByCreatorId" })
matchRoutes.get("/in-progress/creatorid/:id", getInProgressByCreatoridAdapter)

export default matchRoutes
