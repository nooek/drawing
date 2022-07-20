import { mockCreate } from "../../../../mocks/infra/user/userDbMock";
import loginUsecaseMock from "../../../../mocks/main/usecases/user/loginUsecase";
import { InvalidParamError } from "../../../../utils/errors";
import LoginController from "./loginController";

const makeSut = () => {
  const sut = new LoginController(loginUsecaseMock, InvalidParamError);

  return sut;
};

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
    const sut = makeSut();
    const response = await sut.route(body);

    expect(response.statusCode).toBe(200);
  });

  it("should throw for invalid data format", async () => {
    const body = {
      body: {
        email: "example@gmail.com",
        password: "fakepassword123",
      },
    };
    const sut = makeSut();
    const response = await sut.route(body);

    expect(response.statusCode).toBe(400);
  });

  it("should throw for inexistent email", async () => {
    const body = {
      body: {
        loginInfo: {
          password: "fakepassword123",
        },
      },
    };
    const sut = makeSut();
    const response = await sut.route(body);

    expect(response.statusCode).toBe(400);
  });

  it("should throw for inexistent password", async () => {
    const body = {
      body: {
        loginInfo: {
          email: "example@gmail.com",
        },
      },
    };
    const sut = makeSut();
    const response = await sut.route(body);

    expect(response.statusCode).toBe(400);
  });
});
