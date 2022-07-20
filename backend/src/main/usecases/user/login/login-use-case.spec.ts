import LoginUsecase from "./loginUsecase";
import tokenGeneratorMock, { mockGenerate } from "../../../../mocks/helpers/tokenGeneratorMock";
import encrypterMock, { mockHash, mockCompare } from "../../../../mocks/helpers/hashPasswordMock";
import { mockFindByEmail, mockCreate } from "../../../../mocks/infra/user/userDbMock";
import TokenGenerator from "../../../../utils/helpers/tokenGenerator/tokenGenerator";
import HashPassword from "../../../../utils/helpers/hashPassword/hashPassword";
import { InvalidParamError, MissingParamError, UnauthorizedError } from "../../../../utils/errors";

jest.mock("../../../../utils/helpers/tokenGenerator/tokenGenerator.ts", () => {
  return jest.fn().mockImplementation(() => {
    return {
      generate: mockGenerate,
    };
  });
});

jest.mock("../../../../utils/helpers/hashPassword/hashPassword.ts", () => {
  return jest.fn().mockImplementation(() => {
    return {
      hash: mockHash,
      compare: mockCompare,
    };
  });
});

const makeSut = () => {
  const sut = new LoginUsecase(
    { findByEmail: mockFindByEmail },
    { generate: mockGenerate },
    { compare: mockCompare, hash: mockHash },
    MissingParamError,
    InvalidParamError,
    UnauthorizedError,
  );
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

const makeLoginInfo = () => {
  const userData = {
    email: "example@gmail.com",
    password: "fakepassword123",
  };
  return userData
};

describe("test loginusecase", () => {
  beforeEach(() => {
    mockGenerate.mockClear();
    encrypterMock.mockClear();
    mockHash.mockClear();
    mockCompare.mockClear();
    mockFindByEmail.mockClear();
    mockCreate.mockClear();
  });

  it("should return the user", async () => {
    const sut = makeSut();
    const loginInfo = makeLoginInfo()
    const user = makeNewUser();
    const foundUser =  await sut.execute(loginInfo);
    expect(mockCompare).toHaveBeenCalledTimes(1)
    expect(mockFindByEmail).toHaveBeenCalledTimes(1)
    expect(foundUser).toHaveProperty("returnData", {
      id: user.id,
      name: user.name,
      email: user.email
    })
  });

  it("should throw for inexistent user", async () => {
    const sut = makeSut();
    const loginInfo = { email: "dsdasd", password: "dsadsd" }
    const foundUser = sut.execute(loginInfo);
    expect(mockFindByEmail).toHaveBeenCalledTimes(1)
    expect(foundUser).rejects.toThrow()
  });

  it("should throw for invalid password", async () => {
    const sut = makeSut();
    makeNewUser()
    const loginInfo = { email: "example@gmail.com", password: "dsadsd" }
    const foundUser = sut.execute(loginInfo);
    expect(mockFindByEmail).toHaveBeenCalledTimes(1)
    expect(foundUser).rejects.toThrow()
  });
});
