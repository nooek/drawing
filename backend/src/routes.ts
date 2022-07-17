import { Router } from "express"
import userRoutes from "./presentation/routes/user"

const routes = Router()

routes.use("/user", userRoutes)

export default routes;
