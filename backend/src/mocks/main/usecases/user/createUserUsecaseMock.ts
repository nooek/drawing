import { user } from "../../../../domain/entities";
import { MissingParamError, UnauthorizedError } from "../../../../utils/errors";
import { mockCreate, mockFindByEmail } from "../../../infra/user/userDbMock";

export const mockExecute = jest.fn((userData) => {
  if (!userData.id) return new MissingParamError({ message: "x" }, 400);
  if (!userData.name) return new MissingParamError({ message: "x" }, 400);
  if (!userData.email) return new MissingParamError({ message: "x" }, 400);
  if (!userData.password) return new MissingParamError({ message: "x" }, 400);

  const userEntity = user.create({
    id: userData.id,
    name: userData.name,
    email: userData.email,
    password: userData.password,
  });
  if (userEntity instanceof Error) return userEntity

  const userExists = mockFindByEmail(userData.email);
  console.log(userExists);
  if (userExists !== null) return new UnauthorizedError({ message: "x" }, 401);

  mockFindByEmail.mockClear();

  return {
    statusCode: 200,
    body: {
      id: userEntity.getId(),
      name: userEntity.getName(),
      email: userEntity.getEmail(),
    }
  }
});

const mock = jest.fn().mockImplementation(() => {
  return {
    execute: mockExecute,
  };
});

export default mock;
