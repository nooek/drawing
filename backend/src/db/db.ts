import { Sequelize } from 'sequelize-typescript'
import User from '../models/UserModel';

const sequelize = new Sequelize({
  database: process.env.DB_NAME as string,
  dialect: "mysql",
  username: process.env.DB_USER as string,
  password: "",
  storage: ":memory:",
  models: [User]
})

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
