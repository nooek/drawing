import { InvalidParamError } from "../../../../utils/errors";
import { mockExecute } from "../../../main/usecases/user/createUserUsecaseMock";

export const mockRoute = jest.fn(async (httpRequest) => {
  const { body } = httpRequest;

  if (!body) return new InvalidParamError({ message: "" }, 400)

  const user = await mockExecute(body.userData);

  console.log(user)

  return user
});

const mock = jest.fn().mockImplementation(() => {
  return {
    route: mockRoute,
  };
});

export default mock;
