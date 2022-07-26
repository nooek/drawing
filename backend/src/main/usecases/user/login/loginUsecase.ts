import HashPasswordInterface from "../../../../interfaces/helpers/hashPasswordInterface";
import TokenGeneratorInterface from "../../../../interfaces/helpers/tokenGeneratorInterface";
import { LoginInfoType } from "../../../../types/UserLoginType";
import LoginInterface from "../../../../interfaces/main/usecases/user/loginInterface";
export default class LoginUsecase implements LoginInterface {
  private tokenGenerator: TokenGeneratorInterface;
  private encrypter: HashPasswordInterface;
  private userDb: any;
  private InvalidParamError: any;
  private UnauthorizedError: any;
  private MissingParamError: any;

  constructor(
    userDb: any,
    tokenGenerator: TokenGeneratorInterface,
    encrypter: HashPasswordInterface,
    MissingParamError: any,
    InvalidParamError: any,
    UnauthorizedError: any,
  ) {
    this.tokenGenerator = tokenGenerator;
    this.encrypter = encrypter;
    this.userDb = userDb;
    this.MissingParamError = MissingParamError;
    this.InvalidParamError = InvalidParamError;
    this.UnauthorizedError = UnauthorizedError;
  }

  async execute(loginInfo: LoginInfoType) {
    if (!loginInfo.email)
      throw new this.MissingParamError({
        statusCode: 400,
        body: {
          message: "Email not provided",
        },
      });
    if (!loginInfo.password)
      throw new this.MissingParamError({
        statusCode: 400,
        body: {
          message: "Password not provided",
        },
      });

    const userFound = await this.userDb.findByEmail(loginInfo.email);
    if (userFound.id === null) {
      return new this.InvalidParamError({
        statusCode: 400,
        body: {
          message: "User not found",
        },
      });
    }

    const isPasswordSame = await this.encrypter.compare(loginInfo.password, userFound.password);
    console.log(isPasswordSame);
    if (!isPasswordSame) {
      throw new this.UnauthorizedError({
        statusCode: 401,
        body: {
          message: "Email/Password incorrect",
        },
      });
    }

    const returnData = {
      name: userFound.name,
      email: userFound.email,
    };
    const token = this.tokenGenerator.generate(returnData);
    return {
      returnData,
      token: token,
    };
  }
}
