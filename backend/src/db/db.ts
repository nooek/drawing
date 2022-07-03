import { Dialect, Sequelize } from "sequelize"

console.log(process.env.DB_HOST)

const hostConfig = {
  host: process.env.DB_HOST as string,
  dialect: process.env.DB_DIALECT as Dialect
}

const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, "", hostConfig)

const verifyConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
}

verifyConnection();

export default sequelize;
