import { MissingParamError } from "../../../../utils/errors";

type LoginInfoType = {
  email: string;
  password: string;
};

export default class LoginUsecase {
  private tokenGenerator: any;
  private encrypter: any;
  private userDb: any;
  private ServerError: any;
  private InvalidParamError: any;
  private UnauthorizedError: any;
  private MissingParamError: any;

  constructor(tokenGenerator: any, encrypter: any, userDb: any, ServerError: any, MissingParamError: any, InvalidParamError: any, UnauthorizedError: any) {
    this.tokenGenerator = tokenGenerator;
    this.encrypter = encrypter;
    this.userDb = userDb;
    this.ServerError = ServerError;
    this.MissingParamError = MissingParamError
    this.InvalidParamError = InvalidParamError;
    this.UnauthorizedError = UnauthorizedError;
  }

  async execute(loginInfo: LoginInfoType) {
    try {
      if (!loginInfo.email) throw new MissingParamError({
        statusCode: 400,
        body: {
          message: "Email not provided"
        }
      })
      if (!loginInfo.password) throw new MissingParamError({
        statusCode: 400,
        body: {
          message: "Email not provided"
        }
      })

      const userFound = await this.userDb.findByEmail(loginInfo.email);
      if (userFound.id === null) {
        throw new this.InvalidParamError({
          statusCode: 400,
          body: {
            message: "User not found"
          }
        });
      }

      const isPasswordSame = this.encrypter.compare(loginInfo.password, userFound.password);
      if (!isPasswordSame) {
        throw new this.UnauthorizedError({
          statusCode: 401,
          body: {
            message: "Email/Password incorect"
          }
        });
      }

      const returnData = {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
      };
      const token = this.tokenGenerator.generate(returnData, process.env.TOKEN_KEY);
      if (token) {
        return {
          returnData,
          token: token,
        };
      }
      throw new this.ServerError({ statusCode: 500 });
    } catch (e) {
      throw new this.ServerError({ statusCode: 500 });
    }
  }
}
