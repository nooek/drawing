import { InvalidParamError, MissingParamError } from "../../../../utils/errors";
import { mockExecute } from "../../../main/usecases/user/loginUsecase";

export const mockRoute = jest.fn((httpRequest) => {
  const { body } = httpRequest;

  if (!body) return new MissingParamError({ message: "" }, 400)
  if (!body.loginInfo) return new MissingParamError({ message: "" }, 400)

  const user = mockExecute(body.loginInfo)

  return user
})

const mock = jest.fn().mockImplementation(() => {
  return {
    route: mockRoute
  }
})

export default mock;
