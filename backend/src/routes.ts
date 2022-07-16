import { Router } from "express"
import router from "./presentation/routes/user"

const routes = Router()

routes.use("/user", router)

export default routes;
