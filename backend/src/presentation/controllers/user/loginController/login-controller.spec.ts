import { mockCreate } from "../../../../mocks/infra/user/userDbMock";
import loginUsecaseMock, { mockRoute } from "../../../../mocks/presentation/controllers/user/loginControllerMock";
import { InvalidParamError } from "../../../../utils/errors";
import LoginController from "./loginController";

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

describe("Test login controller", () => {

  beforeEach(() => {
    mockRoute.mockClear()
    loginUsecaseMock.mockClear()
  })

  it("should return a status code 200", async () => {
    const body = {
      body: {
        loginInfo: {
          email: "example@gmail.com",
          password: "fakepassword123",
        },
      },
    };
    makeNewUser();
    const response = mockRoute(body);

    expect(response.statusCode).toBe(200);
  });

  it("should throw for invalid data format", () => {
    const body = {
      body: {
        email: "example@gmail.com",
        password: "fakepassword123",
      },
    };
    const response = mockRoute(body);

    expect(response.statusCode).toBe(400);
  });

  it("should throw for inexistent email", () => {
    const body = {
      body: {
        loginInfo: {
          password: "fakepassword123",
        },
      },
    };
    const response = mockRoute(body);

    expect(response.statusCode).toBe(400);
  });

  it("should throw for inexistent password", () => {
    const body = {
      body: {
        loginInfo: {
          email: "example@gmail.com",
        },
      },
    };
    const response = mockRoute(body);

    expect(response.statusCode).toBe(400);
  });
});
