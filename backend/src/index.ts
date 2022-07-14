import express from "express"
const app = express()
import dotenv from "dotenv"
import middlewares from "./middlewares"

dotenv.config()
app.use(middlewares)

app.get("/api", (req, res) => {
  res.send("Hello")
})

app.get("/", (req, res) => {
  res.send("Go to /api")
})

export default app;
