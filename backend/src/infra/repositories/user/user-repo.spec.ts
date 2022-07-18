import UserRepoMock, {
  mockCreate,
  mockFindByEmail,
  createdUsers,
} from "../../../mocks/infra/user/userDbMock";
import UserRepo from "./userRepo"

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
    const userCreated = await sut.create(user)
    expect(mockCreate).toHaveBeenCalledWith(user);
    expect(userCreated.email).toBe(user.email);
  });

  it("Should not create a new user without password", () => {
    const user = {
      id: "fake_id",
      name: "fake_name",
      email: "example@gmail.com",
    };

    expect(() => mockCreate(user)).toThrowError();
  });

  it("Should not create a new user without email", () => {
    const user = {
      id: "fake_id",
      name: "fake_name",
      password: "fakepassword123",
    };

    expect(() => mockCreate(user)).toThrowError();
  });

  it("Should not create a new user without name", () => {
    const user = {
      id: "fake_id",
      email: "example@gmail.com",
      password: "fakepassword123",
    };

    expect(() => mockCreate(user)).toThrowError();
  });

  it("Should not create a new user without id", () => {
    const user = {
      name: "fake_name",
      email: "example@gmail.com",
      password: "fakepassword123",
    };

    expect(() => mockCreate(user)).toThrowError();
  });

  it("Should find a user by email", async () => {
    const user = {
      id: "fake_id",
      name: "fake_name",
      email: "example@gmail.com",
      password: "fakepassword123",
    };
    const sut = makeSut()

    await sut.create(user);
    const foundUser = await sut.findByEmail(user.email);
    expect(foundUser.email).toBe(user.email);
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
    expect(foundUser.email).toBeNull();
  });
});
