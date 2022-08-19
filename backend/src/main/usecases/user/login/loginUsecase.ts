import HashPasswordInterface from "../../../../interfaces/helpers/hashPasswordInterface";
import TokenGeneratorInterface from "../../../../interfaces/helpers/tokenGeneratorInterface";
import { LoginInfoType } from "../../../../types/UserLoginType";
import LoginInterface from "../../../../interfaces/main/usecases/user/loginInterface";
import { BaseResponseConstructor } from "../../../../utils/errors/interfaces";
export default class LoginUsecase implements LoginInterface {
  private tokenGenerator: TokenGeneratorInterface;
  private encrypter: HashPasswordInterface;
  private userDb: any;
  private InvalidParamError: BaseResponseConstructor;
  private UnauthorizedError: BaseResponseConstructor;
  private MissingParamError: BaseResponseConstructor;

  constructor(
    userDb: any,
    tokenGenerator: TokenGeneratorInterface,
    encrypter: HashPasswordInterface,
    MissingParamError: BaseResponseConstructor,
    InvalidParamError: BaseResponseConstructor,
    UnauthorizedError: BaseResponseConstructor,
  ) {
    this.tokenGenerator = tokenGenerator;
    this.encrypter = encrypter;
    this.userDb = userDb;
    this.MissingParamError = MissingParamError;
    this.InvalidParamError = InvalidParamError;
    this.UnauthorizedError = UnauthorizedError;
  }

  async execute(loginInfo: LoginInfoType) {
    if (!loginInfo.email) return new this.MissingParamError(400, { message: "Email not provided" });

    if (!loginInfo.password)
      return new this.MissingParamError(400, {
        message: "Password not provided",
      });

    const userFound = await this.userDb.findByEmail(loginInfo.email);
    if (userFound instanceof Error) return userFound;
    if (userFound === null) {
      return new this.InvalidParamError(400, {
        message: "User not found",
      })
    }

    const isPasswordSame = await this.encrypter.compare(loginInfo.password, userFound.password);
    if (!isPasswordSame) {
      return new this.UnauthorizedError(400, {
        message: "Email/Password incorrect"
      })
    }

    const returnData = {
      name: userFound.name,
      email: userFound.email,
      id: userFound.id,
    };
    console.log(returnData);
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
