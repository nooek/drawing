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
    if (!loginInfo.email) return new this.MissingParamError({ message: "Email not provided" }, 400);

    if (!loginInfo.password)
      return new this.MissingParamError(
        {
          message: "Password not provided",
        },
        400,
      );

    const userFound = await this.userDb.findByEmail(loginInfo.email);
    if (userFound.id === null) {
      return new this.InvalidParamError(
        {
          message: "User not found",
        },
        400,
      );
    }
    if (userFound instanceof Error) return userFound;

    const isPasswordSame = await this.encrypter.compare(loginInfo.password, userFound.password);
    console.log(isPasswordSame);
    if (!isPasswordSame) {
      return new this.UnauthorizedError(
        {
          message: "Email/Password incorrect",
        },
        401,
      );
    }

    const returnData = {
      name: userFound.name,
      email: userFound.email,
    };
    const token = this.tokenGenerator.generate(returnData);
    return {
      statusCode: 200,
      body: {
        returnData,
        token: token,
      },
    };
  }
}
