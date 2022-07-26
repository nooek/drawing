import { InvalidParamError, MissingParamError, UnauthorizedError } from "../../../../utils/errors";
import createUserUsecaseMock, { mockExecute } from "../../../../mocks/main/usecases/user/createUserUsecaseMock";
import { mockCreate, mockFindByEmail } from "../../../../mocks/infra/user/userDbMock";

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
    const createdEntity = mockExecute(user)

    expect(createdEntity).toHaveProperty("statusCode", 200)
  });

  it("Should not create a new entity without password", async () => {
    const user = {
      id: "fake_id",
      name: "fake_name",
      email: "example@gmail.com",
    };

    expect(mockExecute(user)).toBeInstanceOf(MissingParamError)
  });

  it("Should not create a new entity without email", async () => {
    const user = {
      id: "fake_id",
      name: "fake_name",
      password: "fakepassword123",
    };

    expect(mockExecute(user)).toBeInstanceOf(MissingParamError)
  });

  it("Should not create a new entity without name", async () => {
    const user = {
      id: "fake_id",
      email: "example@gmail.com",
      password: "fakepassword123",
    };

    expect(mockExecute(user)).toBeInstanceOf(MissingParamError)
  });

  it("Should not create a new entity without id", async () => {
    const user = {
      name: "fake_name",
      email: "example@gmail.com",
      password: "fakepassword123",
    };

    expect(mockExecute(user)).toBeInstanceOf(MissingParamError)
  });

  it("Should throw for existent user", () => {
    const user = {
      id: "fake_id",
      name: "fake_name",
      email: "example@gmail.com",
      password: "fakepassword123",
    };
    mockCreate(user)

    const userFound = mockExecute(user)
    
    expect(userFound).toBeInstanceOf(UnauthorizedError)
  });
});
