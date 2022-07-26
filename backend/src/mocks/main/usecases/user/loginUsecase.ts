import LoginUsecase from "../../../../main/usecases/user/login/loginUsecase";
import { mockFindByEmail } from "../../../../mocks/infra/user/userDbMock";
import { mockGenerate } from "../../../../mocks/helpers/tokenGeneratorMock";
import { mockCompare } from "../../../../mocks/helpers/hashPasswordMock";
import { MissingParamError } from "../../../../utils/errors";
import { InvalidParamError, UnauthorizedError } from "../../../../utils/errors";

export const mockExecute = jest.fn((loginInfo) => {
  if (!loginInfo.email) return new MissingParamError({ message: "x" }, 400);
  if (!loginInfo.password) return new MissingParamError({ message: "x" }, 400);

  const userFound = mockFindByEmail(loginInfo.email)
  if (userFound instanceof Error) return userFound
  if (userFound === null) {
    console.log("aaaaaaaaaaa")
    return new InvalidParamError({ message: "x" }, 400)
  }

  mockFindByEmail.mockClear()

  const isPasswordSame = mockCompare(loginInfo.password, userFound.password)
  if (!isPasswordSame) {
    console.log("aaabbbbbaaaa")
    return new UnauthorizedError({ message: "x" }, 401)
  }
  mockCompare.mockClear()

  const returnData = {
    name: userFound.name,
    email: userFound.email
  }

  const token = mockGenerate(returnData)
  mockGenerate.mockClear()

  return {
    statusCode: 200,
    body: {
      returnData,
      token: token
    }
  }
})

const mock = jest.fn().mockImplementation(() => {
  return {
    execute: mockExecute
  };
});

export default mock;
