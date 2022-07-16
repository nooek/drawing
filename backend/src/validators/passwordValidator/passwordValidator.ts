export default function passwordValidator(password: string) {
  if (password.length < 8 || !/\d/.test(password)) {
    return {
      message: "The password must have at least 8 characters and a number",
      isValid: false
    }
  }

  return { isValid: true }
}
