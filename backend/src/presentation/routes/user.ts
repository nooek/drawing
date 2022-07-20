import express from "express";
import HttpAdapter from "../adapters/httpAdapter"
import CreateUserController from "../controllers/user/createController/createController"
import { loginController } from "../controllers/user";
const userRoutes = express.Router()

const createAdapter = new HttpAdapter(new CreateUserController).adapt()
userRoutes.post("/", createAdapter as any)
const loginAdapter = new HttpAdapter(loginController).adapt()
userRoutes.post("/login", loginAdapter)

export default userRoutes;
