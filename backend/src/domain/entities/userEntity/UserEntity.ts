// import { Entity } from "../../../core/domain/entities/Entity";
import UserAttributes from "../../../types/UserType";
export default class User {
  private emailValidator: Function;
  private passwordValidator: Function;
  private uuid: Function;
  private InvalidParamError: any;
  private MissingParamError: any;

  constructor(
    emailValidator: Function,
    passwordValidator: Function,
    uuid: Function,
    InvalidParamError: any,
    MissingParamError: any,
  ) {
    this.emailValidator = emailValidator;
    this.passwordValidator = passwordValidator;
    this.uuid = uuid;
    this.InvalidParamError = InvalidParamError;
    this.MissingParamError = MissingParamError;
  }

  public create(props: UserAttributes) {
    if (!props.name) {
      return new this.MissingParamError(
        {
          message: "You username must have between 3 and 35 characters",
        },
        400,
      );
    }

    if (props.name.length < 3 || props.name.length > 35) {
      return new this.InvalidParamError(
        {
          message: "You username must have between 3 and 35 characters",
        },
        400,
      );
    }

    if (!props.email) {
      return new this.MissingParamError(
        {
          message: "Please provide an email",
        },
        400,
      );
    }
    const emailValid = this.emailValidator(props.email);
    if (!emailValid.isValid) {
      return new this.InvalidParamError(
        {
          message: emailValid.message,
        },
        400,
      );
    }

    if (!props.password) {
      return new this.MissingParamError(
        {
          message: "Please provide a password",
        },
        400,
      );
    }
    const passwordValid = this.passwordValidator(props.password);
    if (!passwordValid.isValid) {
      return new this.InvalidParamError(
        {
          message: passwordValid.message,
        },
        400,
      );
    }

    return {
      getId: () => (props.id ? props.id : this.uuid()),
      getName: () => props.name,
      getEmail: () => props.email,
      getPassword: () => props.password,
    };
  }
}
