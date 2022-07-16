import bcrypt from "bcrypt"

export default class HashPassword {
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
