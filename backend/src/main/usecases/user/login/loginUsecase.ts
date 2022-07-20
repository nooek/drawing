import TokenGeneratorInterface from "../../../../interfaces/helpers/tokenGeneratorInterface";
import { LoginInfoType } from "../../../../types/UserLoginType";

export default class LoginUsecase {
  private tokenGenerator: TokenGeneratorInterface;
  private encrypter: any;
  private userDb: any;
  private ServerError: any;
  private InvalidParamError: any;
  private UnauthorizedError: any;
  private MissingParamError: any;

  constructor(
    tokenGenerator: TokenGeneratorInterface,
    encrypter: any,
    userDb: any,
    ServerError: any,
    MissingParamError: any,
    InvalidParamError: any,
    UnauthorizedError: any,
  ) {
    this.tokenGenerator = tokenGenerator;
    this.encrypter = encrypter;
    this.userDb = userDb;
    this.ServerError = ServerError;
    this.MissingParamError = MissingParamError;
    this.InvalidParamError = InvalidParamError;
    this.UnauthorizedError = UnauthorizedError;
  }

  async execute(loginInfo: LoginInfoType) {
    try {
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
            message: "Email not provided",
          },
        });

      const userFound = await this.userDb.findByEmail(loginInfo.email);
      if (userFound.id === null) {
        throw new this.InvalidParamError({
          statusCode: 400,
          body: {
            message: "User not found",
          },
        });
      }

      const isPasswordSame = this.encrypter.compare(loginInfo.password, userFound.password);
      if (!isPasswordSame) {
        throw new this.UnauthorizedError({
          statusCode: 401,
          body: {
            message: "Email/Password incorect",
          },
        });
      }

      const returnData = {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
      };
      const token = this.tokenGenerator.generate(returnData);
      return {
        returnData,
        token: token,
      };
    } catch (e) {
      throw new this.ServerError({ statusCode: 500 });
    }
  }
}
