import TokenGeneratorInterface from "../../../../interfaces/helpers/tokenGeneratorInterface";
import { BaseResponseConstructor } from "../../../../utils/errors/interfaces";

export default class AuthUsecase {
  private userDb: any
  private tokenGenerator: TokenGeneratorInterface
  private MissingParamError: BaseResponseConstructor
  
  constructor(userDb: any, tokenGenerator: TokenGeneratorInterface, MissingParamError: BaseResponseConstructor) {
    this.userDb = userDb;
    this.tokenGenerator = tokenGenerator;
    this.MissingParamError = MissingParamError;
  }

  async execute(token: string) {
    try {
      if (!token) {
        throw new this.MissingParamError(400, {
          message: "Token was not provided"
        })
      }

      console.log(token)

      const userInfoFromToken = this.tokenGenerator.decode(token)

      console.log(userInfoFromToken)

      const userFound = await this.userDb.findByEmail(userInfoFromToken.email)
      
      const returnData = {
        name: userFound.name,
        email: userFound.email,
        id: userFound.id
      };
      return {
        returnData,
      };
    } catch(err) {
      throw err
    }

  }
}