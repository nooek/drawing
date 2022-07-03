import app from "./index"
import sequelize from "./db/db"

app.listen(8888, async () => {
  await sequelize.sync()
  console.log("Listening to port 8888")
})
