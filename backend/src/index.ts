import express from "express"
const app = express()
import dotenv from "dotenv"
import middlewares from "./middlewares"
import routes from "./routes"

dotenv.config()
app.use(middlewares)

app.get("/api", (req, res) => {
  res.send("Hello")
})

app.get("/", (req, res) => {
  res.send("Go to /api")
})

app.use(routes)

export default app;
