import bcrypt from "bcrypt"
import HashPassword from "./hashPassword"

const makeParams = () => {
  const password = "fakepassword123"
  return {
    password: password,
    hashedPassword: password
  }
}

const makeHashPassword = async (params?: any) => {
  const sut = new HashPassword()

  return {
    hash: await sut.hash,
    compare: await sut.compare
  };
}

const makeSut = async () => {
  const { hash, compare } = await makeHashPassword();
  const params = await makeParams();

  return {
    hash: hash,
    compare: compare,
    params: params
  }
}

describe("Test if hashPassword is working", () => {
  it("Should hash password", async () => {

    const { hash, params } = await makeSut()

    const hashedPassword = await hash(params.password)
    const comparePwd = await bcrypt.compare(params.password, hashedPassword)

    expect(comparePwd).toBe(true)
  })

  it("Should give true when comparing", async () => {
    const saltRounds = 10

    const { compare, params } = await makeSut()

    const hashedPassword = await bcrypt.hash(params.password, saltRounds)
    const comparePwd = await compare(params.password, hashedPassword)

    expect(comparePwd).toBe(true)
  })

  it("Should give false when comparing", async () => {
    const saltRounds = 10
  
    const { compare, params } = await makeSut()
  
    const hashedPassword = await bcrypt.hash(params.password, saltRounds)
    const comparePwd = await compare("notfakepwd", hashedPassword)

    expect(comparePwd).toBe(false)
  })
})
