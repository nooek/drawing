import { mockExecute } from "../../../main/usecases/user/createUserUsecaseMock";

export const mockRoute = jest.fn(async (httpRequest) => {
  try {
    const { body } = httpRequest;
    const user = await mockExecute(body.userData);

    return {
      statusCode: 200,
      body: user,
    };
  } catch (e) {
    throw new Error();
  }
});

const mock = jest.fn().mockImplementation(() => {
  return {
    route: mockRoute,
  };
});

export default mock;
