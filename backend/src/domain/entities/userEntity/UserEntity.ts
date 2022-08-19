import UserAttributes from "../../../types/UserType";
import { BaseResponseConstructor } from "../../../utils/errors/interfaces";
export default class User {
  private emailValidator: Function;
  private passwordValidator: Function;
  private uuid: Function;
  private InvalidParamError: BaseResponseConstructor;
  private MissingParamError: BaseResponseConstructor;

  constructor(
    emailValidator: Function,
    passwordValidator: Function,
    uuid: Function,
    InvalidParamError: BaseResponseConstructor,
    MissingParamError: BaseResponseConstructor,
  ) {
    this.emailValidator = emailValidator;
    this.passwordValidator = passwordValidator;
    this.uuid = uuid;
    this.InvalidParamError = InvalidParamError;
    this.MissingParamError = MissingParamError;
  }

  public create(props: UserAttributes) {
    if (!props.name) {
      return new this.MissingParamError(400, {
        message: "You username must have between 3 and 35 characters",
      })
    }

    if (props.name.length < 3 || props.name.length > 35) {
      return new this.InvalidParamError(400, {
        message: "You username must have between 3 and 35 characters",
      })
    }

    if (!props.email) {
      return new this.MissingParamError(400, {
        message: "Please provide an email",
      });
    }
    const emailValid = this.emailValidator(props.email);
    if (!emailValid.isValid) {
      return new this.InvalidParamError(400, {
        message: emailValid.message,
      });
    }

    if (!props.password) {
      return new this.MissingParamError(400, {
        message: "Please provide a password",
      });
    }
    const passwordValid = this.passwordValidator(props.password);
    if (!passwordValid.isValid) {
      return new this.InvalidParamError(400, {
        message: passwordValid.message,
      });
    }

    return {
      getId: () => (props.id ? props.id : this.uuid()),
      getName: () => props.name,
      getEmail: () => props.email,
      getPassword: () => props.password,
    };
  }
}
