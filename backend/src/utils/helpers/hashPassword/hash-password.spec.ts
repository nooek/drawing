import bcrypt from "bcrypt"
import HashPassword from "./hashPassword"

describe("Test if hashPassword is working", () => {
  it("Should hash password", async () => {
    const fakePwd = "abcdefghij123"

    const hashedPassword = await new HashPassword().hash(fakePwd)
    const comparePwd = await bcrypt.compare(fakePwd, hashedPassword)

    expect(comparePwd).toBe(true)
  })

  it("Should give true when comparing", async () => {
    const fakePwd = "abcdefghij123"
    const saltRounds = 10

    const hashedPassword = await bcrypt.hash(fakePwd, saltRounds)
    const comparePwd = await new HashPassword().compare(fakePwd, hashedPassword)

    expect(comparePwd).toBe(true)
  })

  it("Should give false when comparing", async () => {
    const fakePwd = "abcdefghij123"
    const saltRounds = 10

    const hashedPassword = await bcrypt.hash(fakePwd, saltRounds)
    const comparePwd = await new HashPassword().compare("notfakepwd", hashedPassword)

    expect(comparePwd).toBe(false)
  })
})
