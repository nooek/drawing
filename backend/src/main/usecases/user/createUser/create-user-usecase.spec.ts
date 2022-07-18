import CreateUserUsecase from "./createUserUsecase";
import { UnauthorizedError } from "../../../../utils/errors";
import { v4 as uuidv4 } from "uuid";
import HashPassword from "../../../../utils/helpers/hashPassword/hashPassword";
import createUserUsecaseMock, { mockExecute } from "../../../../mocks/main/usecases/user/createUserUsecaseMock";
import { mockCreate, mockFindByEmail } from "../../../../mocks/infra/user/userDbMock";

jest.mock("./createUserUsecase.ts", () => {
  return jest.fn().mockImplementation(() => {
    return {
      execute: mockExecute,
    };
  });
});

const makeSut = () => {
  const createUserUsecase = new CreateUserUsecase(
    {
      create: () => {},
      findByEmail: () => {},
    },
    uuidv4,
    new HashPassword(),
    UnauthorizedError,
  );
  return createUserUsecase;
};

describe("Test create user usecase", () => {
  beforeEach(() => {
    createUserUsecaseMock.mockClear()
    mockCreate.mockClear()
    mockFindByEmail.mockClear()
    mockExecute.mockClear()
  })

  it("Should create a entity", async () => {
    const user = {
      id: "fake_id",
      name: "fake_name",
      email: "example@gmail.com",
      password: "fakepassword123",
    };
    const sut = makeSut()
    const entityCreated = await sut.execute(user)
    
    expect(entityCreated.statusCode).toBe(200)
  });

  it("Should not create a new entity without password", () => {
    const user = {
      id: "fake_id",
      name: "fake_name",
      email: "example@gmail.com",
    };

    expect(mockExecute(user)).rejects.toThrowError();
  });

  it("Should not create a new entity without email", () => {
    const user = {
      id: "fake_id",
      name: "fake_name",
      password: "fakepassword123",
    };

    expect(mockExecute(user)).rejects.toThrowError();
  });

  it("Should not create a new entity without name", () => {
    const user = {
      id: "fake_id",
      email: "example@gmail.com",
      password: "fakepassword123",
    };

    expect(mockExecute(user)).rejects.toThrowError();
  });

  it("Should not create a new entity without id", () => {
    const user = {
      name: "fake_name",
      email: "example@gmail.com",
      password: "fakepassword123",
    };

    expect(mockExecute(user)).rejects.toThrowError();
  });

  it("Should throw for existent user", async () => {
    const user = {
      id: "fake_id",
      name: "fake_name",
      email: "example@gmail.com",
      password: "fakepassword123",
    };
    mockCreate(user)

    const sut = makeSut()
    const entityCreated = sut.execute(user)
    
    expect(entityCreated).rejects.toThrow()
  });
});
