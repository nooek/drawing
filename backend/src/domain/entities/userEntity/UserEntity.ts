// import { Entity } from "../../../core/domain/entities/Entity";
import UserAttributes from "../../../types/UserType";

export default class User {
  private emailValidator: Function;
  private passwordValidator: Function;
  private uuid: Function;
  private InvalidParamError: any;

  constructor(emailValidator: Function, passwordValidator: Function, uuid: Function, InvalidParamError: any) {
    this.emailValidator = emailValidator;
    this.passwordValidator = passwordValidator;
    this.uuid = uuid
    this.InvalidParamError = InvalidParamError;
  }

  public create(props: UserAttributes) {
    if (props.name.length < 3 || props.name.length > 35) {
      throw new this.InvalidParamError({
        paramName: "name",
        messageToClient: "You username must have between 3 and 35 characters",
        statusCode: 400
      }).generate()
    }

    const emailValid = this.emailValidator(props.email)
    if (!emailValid.isValid) {
      throw new this.InvalidParamError({
        paramName: "email",
        messageToClient: emailValid.message,
        statusCode: 400
      }).generate()
    }

    const passwordValid = this.passwordValidator(props.password)
    if (!passwordValid.isValid) {
      throw new this.InvalidParamError({
        paramName: "password",
        messageToClient: passwordValid.message,
        statusCode: 400
      }).generate()
    }

    return {
      getId: () => props.id ? props.id : this.uuid(),
      getName: () => props.name,
      getEmail: () => props.email,
      getPassword: () => props.password
    }
  }
}
