import express from "express"
const routes = "./routes.ts"
const app = express()
import dotenv from "dotenv"
import middlewares from "./middlewares"

dotenv.config()
app.use(middlewares)
app.get("/", (req, res) => {
  res.send("Hello")
})

export default app;
