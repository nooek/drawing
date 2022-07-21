import TokenGeneratorInterface from "../../../../interfaces/helpers/tokenGeneratorInterface";

export default class AuthUsecase {
  private userDb: any
  private tokenGenerator: TokenGeneratorInterface
  private MissingParamError: any
  
  constructor(userDb: any, tokenGenerator: TokenGeneratorInterface, MissingParamError: any) {
    this.userDb = userDb;
    this.tokenGenerator = tokenGenerator;
    this.MissingParamError = MissingParamError;
  }

  async execute(token: string) {
    try {
      if (!token) {
        throw new this.MissingParamError({
          statusCode: 400,
          body: {
            message: "Token was not provided"
          }
        })
      }

      const userInfoFromToken = this.tokenGenerator.decode(token)

      const userFound = await this.userDb.findByEmail(userInfoFromToken.email)
      
      const returnData = {
        name: userFound.name,
        email: userFound.email,
      };
      return {
        returnData,
      };
    } catch(err) {
      throw err
    }

  }
}