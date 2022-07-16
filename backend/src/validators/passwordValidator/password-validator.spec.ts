import passwordValidator from "./passwordValidator"

describe("Check if password validator is working", () => {
  it("Should return a invalid password (not 8 char long)", () => {
    const fakePassword = "dsdsd";
    const invalidPassword = passwordValidator(fakePassword);

    expect(invalidPassword.isValid).toBe(false);
  });
  it("Should return a invalid password (without number)", () => {
    const fakePassword = "sadadasdsadasa";
    const invalidPassword = passwordValidator(fakePassword);

    expect(invalidPassword.isValid).toBe(false);
  });
  it("Should return valid password", () => {
    const fakePassword = "goldfish123"
    const validPassword = passwordValidator(fakePassword);

    expect(validPassword.isValid).toBe(true);
  })
});
