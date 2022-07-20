import { PasswordValidatorResponse } from "../../interfaces/validators/passwordValidatorInterface"

export default function passwordValidator(password: string): PasswordValidatorResponse {
  if (password.length < 8 || !/\d/.test(password)) {
    return {
      message: "The password must have at least 8 characters and a number",
      isValid: false
    }
  }

  return { isValid: true, message: "Password is valid" }
}
