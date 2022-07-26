import LoginUsecase from "./loginUsecase";
import MockLoginUsecase, { mockExecute } from "../../../../mocks/main/usecases/user/loginUsecase";
import { mockCreate } from "../../../../mocks/infra/user/userDbMock";
import { InvalidParamError, UnauthorizedError } from "../../../../utils/errors";

const makeNewUser = () => {
  const userData = {
    id: "fake_id",
    name: "fake_name",
    email: "example@gmail.com",
    password: "fakepassword123",
  };
  const newUser = mockCreate(userData);
  return newUser;
};

const makeLoginInfo = () => {
  const userData = {
    email: "example@gmail.com",
    password: "fakepassword123",
  };
  return userData
};

describe("test loginusecase", () => {
  beforeEach(() => {
    mockExecute.mockClear();
    MockLoginUsecase.mockClear();
    mockCreate.mockClear();
  });

  it("should return the user", () => {
    const loginInfo = makeLoginInfo()
    makeNewUser();
    const foundUser =  mockExecute(loginInfo);
    expect(foundUser).toHaveProperty("statusCode", 200)
  });

  it("should throw for inexistent user", async () => {
    const loginInfo = { email: "inexistent@email.com", password: "inexistentpassword123" }
    const foundUser = mockExecute(loginInfo);
    expect(foundUser).toBeInstanceOf(InvalidParamError)
  });

  it("should throw for invalid password", async () => {
    makeNewUser()
    const loginInfo = { email: "example@gmail.com", password: "wrongpassword123" }
    const foundUser = mockExecute(loginInfo);
    expect(foundUser).toBeInstanceOf(UnauthorizedError)
  });
});
