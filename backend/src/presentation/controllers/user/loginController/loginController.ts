import LoginInterface from "../../../../interfaces/main/usecases/user/loginInterface";

export default class LoginController {
  private loginUsecase: LoginInterface;
  private invalidParamError: any;

  constructor(loginUsecase: LoginInterface, invalidParamError: any) {
    this.loginUsecase = loginUsecase;
    this.invalidParamError = invalidParamError
  }

  async route(httpRequest: any) {
    try {
      const { body } = httpRequest;
      if (!body.loginInfo) {
        throw new this.invalidParamError({
          statusCode: 400,
          body: {
            message: "Login info not provided"
          }
        })
      }
      const user = await this.loginUsecase.execute(body.loginInfo);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (e: any) {
      console.log(e);
      return {
        statusCode: e.statusCode,
        body: e.body,
      };
    }
  }
}
