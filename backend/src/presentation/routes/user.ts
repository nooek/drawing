import express from "express";
import HttpAdapter from "../adapters/httpAdapter"
import CreateUserController from "../controllers/user/createController"
const router = express.Router()

const createAdapter = new HttpAdapter(new CreateUserController).adapt()
router.post("/", createAdapter as any)

export default router;
