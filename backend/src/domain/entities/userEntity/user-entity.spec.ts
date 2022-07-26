import { InvalidParamError, MissingParamError } from "../../../utils/errors";
import { user } from "../index";

const makeSut = (params: any) => {
  const sut = user.create(params)
  return sut
}

describe("Test user entity", () => {
  it("should throw for invalid name", () => {
    const wrongNameUser = {
      id: "fake_id",
      name: "x",
      email: "fake_email@gmail.com",
      password: "fakepassword123",
    };
    const sut = makeSut(wrongNameUser)

    expect(sut).toHaveProperty('statusCode', 400);
    expect(sut).toBeInstanceOf(InvalidParamError)
  });

  it("should throw for invalid email", () => {
    const wrongEmailUser = {
      id: "fake_id",
      name: "fake_username",
      email: "xxxxx",
      password: "fakepassword123",
    };
    const sut = makeSut(wrongEmailUser)

    expect(sut).toHaveProperty('statusCode', 400);
    expect(sut).toBeInstanceOf(InvalidParamError)
  });

  it("should throw for invalid password", () => {
    const wrongPasswordUser = {
      id: "fake_id",
      name: "fake_username",
      email: "fake_email@gmail.com",
      password: "x",
    };
    const sut = makeSut(wrongPasswordUser)

    expect(sut).toHaveProperty('statusCode', 400);
    expect(sut).toBeInstanceOf(InvalidParamError)
  });

  it("should throw for inexistent name", () => {
    const inexistentNameUser = {
      id: "fake_id",
      email: "fake_email@gmail.com",
      password: "fakepassword123",
    };
    const sut = makeSut(inexistentNameUser)
  
    expect(sut).toHaveProperty('statusCode', 400);
    expect(sut).toBeInstanceOf(MissingParamError)
  })

  it("should throw for inexistent email", () => {
    const inexistentEmailUser = {
      id: "fake_id",
      name: "fake_username",
      password: "fakepassword123",
    };
    const sut = makeSut(inexistentEmailUser)
  
    expect(sut).toHaveProperty('statusCode', 400);
    expect(sut).toBeInstanceOf(MissingParamError)
  })

  it("should throw for inexistent password", () => {
    const inexistentEmailPassword = {
      id: "fake_id",
      name: "fake_username",
      email: "fake_email@gmail.com",
    };
    const sut = makeSut(inexistentEmailPassword)
  
    expect(sut).toHaveProperty('statusCode', 400);
    expect(sut).toBeInstanceOf(MissingParamError)
  })

  it("should return a user", () => {
    const validUser = {
      id: "fake_id",
      name: "fake_username",
      email: "fake_email@gmail.com",
      password: "fakepassword123",
    };

    const userEntity = user.create(validUser)

    expect(userEntity.getName()).toBe(validUser.name)
    expect(userEntity.getEmail()).toBe(validUser.email)
    expect(userEntity.getPassword()).toBe(validUser.password)
  });
});
