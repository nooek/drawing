import UserRepoMock, {
  mockCreate,
  mockFindByEmail,
  createdUsers,
} from "../../../mocks/infra/user/userDbMock";
import UserRepo from "./userRepo"
import UserAttributes from "../../../types/UserType";

jest.mock("./userRepo.ts", () => {
  return jest.fn().mockImplementation(() => {
    return { 
      create: mockCreate,
      findByEmail: mockFindByEmail
    };
  });
});

const makeSut = () => {
  return new UserRepo()
}

describe("Test user repository", () => {

  beforeEach(() => {
    UserRepoMock.mockClear();
    mockCreate.mockClear();
    createdUsers.clean();
  });

  it("Should create a new user", async () => {
    const user = {
      id: "fake_id",
      name: "fake_name",
      email: "example@gmail.com",
      password: "fakepassword123",
    };
    const sut = makeSut()
    const userCreated = sut.create(user)
    expect(mockCreate(user)).toStrictEqual(user);
  });

  it("Should not create a new user without password", () => {
    const user = {
      id: "fake_id",
      name: "fake_name",
      email: "example@gmail.com",
    };
    expect(mockCreate(user)).toHaveProperty('statusCode', 500);
  });

  it("Should not create a new user without email", () => {
    const user = {
      id: "fake_id",
      name: "fake_name",
      password: "fakepassword123",
    };

    expect(mockCreate(user)).toHaveProperty('statusCode', 500);
  });

  it("Should not create a new user without name", () => {
    const user = {
      id: "fake_id",
      email: "example@gmail.com",
      password: "fakepassword123",
    };

    expect(mockCreate(user)).toHaveProperty('statusCode', 500);
  });

  it("Should not create a new user without id", () => {
    const user = {
      name: "fake_name",
      email: "example@gmail.com",
      password: "fakepassword123",
    };

    expect(mockCreate(user)).toHaveProperty('statusCode', 500);
  });

  it("Should not find a user without email", async () => {

    expect(mockFindByEmail()).toHaveProperty('statusCode', 500);
  });

  it("Should find a user by email", async () => {
    const user = {
      id: "fake_id",
      name: "fake_name",
      email: "example@gmail.com",
      password: "fakepassword123",
    };
    const sut = makeSut()

    await mockCreate(user)
    const foundUser = await mockFindByEmail(user.email);
    expect(foundUser).toStrictEqual(user);
  });

  it("Should not find a user by email", async () => {
    const user = {
      id: "fake_id",
      name: "fake_name",
      email: "example@gmail.com",
      password: "fakepassword123",
    };
    const sut = makeSut()
    const foundUser = await sut.findByEmail(user.email)
    expect(foundUser).toBeNull();
  });
});
