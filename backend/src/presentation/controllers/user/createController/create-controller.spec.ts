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

    expect(response).toHaveProperty("statusCode", 200);
  });

  it("should throw for invalid data format", async () => {
    const body = {
      id: "fake_id",
      name: "fake_name",
      email: "example@gmail.com",
      password: "fakepassword123",
    };
    const sut = makeSut();
    const response = await sut.route(body);

    expect(response).toHaveProperty("statusCode", 400);
  });

  it("should throw for not having an id", async () => {
    const body = {
      body: {
        userData: {
          name: "fake_name",
          email: "example@gmail.com",
          password: "fakepassword123",
        },
      },
    };
    const sut = makeSut();
    const response = await sut.route(body);

    expect(response).toHaveProperty("statusCode", 400);
  });

  it("should throw for not having a name", async () => {
    const body = {
      body: {
        userData: {
          id: "fake_id",
          email: "example@gmail.com",
          password: "fakepassword123",
        },
      },
    };
    const sut = makeSut();
    const response = await sut.route(body);

    expect(response).toHaveProperty("statusCode", 400);
  });

  it("should throw for not having an email", async () => {
    const body = {
      body: {
        userData: {
          id: "fake_id",
          name: "fake_name",
          password: "fakepassword123",
        },
      },
    };
    const sut = makeSut();
    const response = await sut.route(body);

    expect(response).toHaveProperty("statusCode", 400);
  });

  it("should throw for not having a password", async () => {
    const body = {
      body: {
        userData: {
          id: "fake_id",
          name: "fake_name",
          email: "example@gmail.com",
        },
      },
    };
    const sut = makeSut();
    const response = await sut.route(body);

    expect(response).toHaveProperty("statusCode", 400);
  });
});
