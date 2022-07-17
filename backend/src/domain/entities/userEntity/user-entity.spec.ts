import { InvalidParamError } from "../../../utils/errors";
import { user } from "../index";

describe("Test user entity", () => {
  it("should throw for invalid name", () => {
    const wrongNameUser = {
      id: "fake_id",
      name: "x",
      email: "fake_email@gmail.com",
      password: "fakepassword123",
    };

    expect(() => user.create(wrongNameUser)).toThrow();
  });

  it("should throw for invalid email", () => {
    const wrongEmailUser = {
      id: "fake_id",
      name: "fake_username",
      email: "xxxxx",
      password: "fakepassword123",
    };

    expect(() => user.create(wrongEmailUser)).toThrow();
  });

  it("should throw for invalid password", () => {
    const wrongPasswordUser = {
      id: "fake_id",
      name: "fake_username",
      email: "fake_email@gmail.com",
      password: "x",
    };

    expect(() => user.create(wrongPasswordUser)).toThrow();
  });

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
