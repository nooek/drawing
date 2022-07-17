// import { Entity } from "../../../core/domain/entities/Entity";
import UserAttributes from "../../../types/UserType";
export default class User {
  private emailValidator: Function;
  private passwordValidator: Function;
  private uuid: Function;
  private InvalidParamError: any;
  private MissingParamError: any;

  constructor(emailValidator: Function, passwordValidator: Function, uuid: Function, InvalidParamError: any, MissingParamError: any) {
    this.emailValidator = emailValidator;
    this.passwordValidator = passwordValidator;
    this.uuid = uuid
    this.InvalidParamError = InvalidParamError;
    this.MissingParamError = MissingParamError
  }

  public create(props: UserAttributes) {
    if (props.name.length < 3 || props.name.length > 35) {
      throw new this.InvalidParamError({
        body: {
          message: "You username must have between 3 and 35 characters",
          paramName: "name"
        },
        statusCode: 400,
      })
    }

    if (!props.email) {
      throw new this.MissingParamError({
        body: {
          message: "Please provide an email",
          paramName: "email"
        },
        statusCode: 400
      })
    }
    const emailValid = this.emailValidator(props.email)
    if (!emailValid.isValid) {
      throw new this.InvalidParamError({
        body: {
          message: emailValid.message,
          paramName: "email"
        },
        statusCode: 400,
      })
    }

    if (!props.password) {
      throw new this.MissingParamError({
        body: {
          message: "Please provide a password",
          paramName: "password"
        },
        statusCode: 400
      })
    }
    const passwordValid = this.passwordValidator(props.password)
    if (!passwordValid.isValid) {
      throw new this.InvalidParamError({
        body: {
          message: passwordValid.message,
          paramName: "password"
        },
        statusCode: 400,
      })
    }

    return {
      getId: () => props.id ? props.id : this.uuid(),
      getName: () => props.name,
      getEmail: () => props.email,
      getPassword: () => props.password
    }
  }
}
