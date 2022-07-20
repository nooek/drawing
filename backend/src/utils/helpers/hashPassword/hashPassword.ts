import bcrypt from "bcrypt"
import HashPasswordInterface from "../../../interfaces/helpers/hashPasswordInterface";
export default class HashPassword implements HashPasswordInterface {
  async hash(password: string) {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    return hashedPassword;
  }

  async compare(password: string, hashedPassword: string) {
    const isEqual = await bcrypt.compare(password, hashedPassword)
    return isEqual
  }
}
