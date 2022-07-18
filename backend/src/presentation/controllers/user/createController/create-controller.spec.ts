import CreateUserController from "./createController";
import createUserControllerMock, {
  mockRoute,
} from "../../../../mocks/presentation/controllers/user/createControllerMock";

jest.mock("./createController.ts", () => {
  return jest.fn().mockImplementation(() => {
    return {
      route: mockRoute,
    };
  });
});

const makeSut = () => {
  const createUserController = new CreateUserController();
  return createUserController;
};

describe("Test the create user controller", () => {
  beforeEach(() => {
    mockRoute.mockClear();
  });
  it("should return a status code 200", async () => {
    const body = {
      body: {
        userData: {
          id: "fake_id",
          name: "fake_name",
          email: "example@gmail.com",
          password: "fakepassword123",
        },
      },
    };
    const sut = makeSut();
    const response = await sut.route(body);

    expect(response.statusCode).toBe(200);
  });

  it("should throw for invalid data format", () => {
    const body = {
      id: "fake_id",
      name: "fake_name",
      email: "example@gmail.com",
      password: "fakepassword123",
    };
    const sut = makeSut();
    const response = sut.route(body);

    expect(response).rejects.toThrowError();
  });

  it("should throw for not having an id", () => {
    const body = {
      name: "fake_name",
      email: "example@gmail.com",
      password: "fakepassword123",
    };
    const sut = makeSut();
    const response = sut.route(body);

    expect(response).rejects.toThrowError();
  });

  it("should throw for not having a name", () => {
    const body = {
      id: "fake_id",
      email: "example@gmail.com",
      password: "fakepassword123",
    };
    const sut = makeSut();
    const response = sut.route(body);

    expect(response).rejects.toThrowError();
  });

  it("should throw for not having an email", () => {
    const body = {
      id: "fake_id",
      name: "fake_name",
      password: "fakepassword123",
    };
    const sut = makeSut();
    const response = sut.route(body);

    expect(response).rejects.toThrowError();
  });

  it("should throw for not having a password", () => {
    const body = {
      id: "fake_id",
      name: "fake_name",
      email: "example@gmail.com",
    };
    const sut = makeSut();
    const response = sut.route(body);

    expect(response).rejects.toThrowError();
  });
});
