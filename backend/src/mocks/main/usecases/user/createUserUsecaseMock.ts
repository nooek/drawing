import { user } from "../../../../domain/entities";
import { mockCreate, mockFindByEmail } from "../../../infra/user/userDbMock";

export const mockExecute = jest.fn(async (userData) => {
  try {
    if (!userData.id) throw new Error();
    if (!userData.name) throw new Error();
    if (!userData.email) throw new Error();
    if (!userData.password) throw new Error();

    const userEntity = await user.create({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });

    const userExists = await mockFindByEmail(userData.email);
    console.log(userExists)
    if (userExists.id !== null) throw new Error();

    mockFindByEmail.mockClear()

    return {
      message: "Success",
      statusCode: 200,
      user: {
        id: userEntity.getId(),
        name: userEntity.getName(),
        email: userEntity.getEmail()
      },
    };
  } catch (e) {
    console.log(e)
    throw new Error();
  }
});

const mock = jest.fn().mockImplementation(() => {
  return {
    execute: mockExecute
  };
});

export default mock
