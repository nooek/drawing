import validator from "email-validator"

const emailValidator = (email: string) => {
  if (!validator.validate(email)) {
    return { 
      message: "Invalid email",
      isValid: false
    }
  }
  return { isValid: true, message: "" }
}

export default emailValidator;
