import LoginInterface from "../../../../interfaces/main/usecases/user/loginInterface";

export default class LoginController {
  private loginUsecase: any;
  private missingParamError: any;

  constructor(loginUsecase: any, missingParamError: any) {
    this.loginUsecase = loginUsecase;
    this.missingParamError = missingParamError
  }

  async route(httpRequest: any) {
    try {
      const { body } = httpRequest;
  
      if (!body) {
        return new this.missingParamError({
            message: "Login info not provided"
        }, 400)
      }
      const user = await this.loginUsecase.execute(body.loginInfo);

      return {
        statusCode: user.statusCode,
        body: user.body
      };
    } catch (e: any) {
      console.log(e);
      return {
        statusCode: e.statusCode ? e.statusCode : 500,
        body: e.body ? e.body : e,
      };
    }
  }
}
