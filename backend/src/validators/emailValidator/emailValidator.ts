import validator from "email-validator"
import { EmailValidatorResponse } from "../../interfaces/validators/emailValidatorInterface"

const emailValidator = (email: string): EmailValidatorResponse => {
  if (!validator.validate(email)) {
    return { 
      message: "Invalid email",
      isValid: false
    }
  }
  return { isValid: true, message: "Email is valid" }
}

export default emailValidator;
