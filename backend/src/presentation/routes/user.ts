import express from "express";
import HttpAdapter from "../adapters/httpAdapter"
import CreateUserController from "../controllers/user/createController"
const userRoutes = express.Router()

const createAdapter = new HttpAdapter(new CreateUserController).adapt()
userRoutes.post("/", createAdapter as any)

export default userRoutes;
