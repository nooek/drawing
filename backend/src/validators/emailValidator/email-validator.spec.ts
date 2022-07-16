import emailValidator from "./emailValidator";

describe("Check if email validator is working", () => {
  it("Should return a invalid email", () => {
    const fakeEmail = "fakeemailll"
    const invalidEmail = emailValidator(fakeEmail)

    expect(invalidEmail.isValid).toBe(false)
  })
  it("Should a valid email", () => {
    const email = "example@gmail.com"
    const validEmail = emailValidator(email)

    expect(validEmail.isValid).toBe(true)
  })
})