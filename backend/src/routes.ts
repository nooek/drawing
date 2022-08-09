import { Router } from "express"
import userRoutes from "./presentation/routes/user"
import matchRoutes from "./presentation/routes/match"

const routes = Router()

routes.use("/user", userRoutes)
routes.use("/match", matchRoutes)

export default routes;
