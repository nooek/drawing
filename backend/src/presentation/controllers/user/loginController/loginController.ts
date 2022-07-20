import LoginInterface from "../../../../interfaces/main/usecases/user/loginInterface";

export default class LoginController {
  private loginUsecase: LoginInterface;

  constructor(loginUsecase: LoginInterface) {
    this.loginUsecase = loginUsecase;
  }

  async route(httpRequest: any) {
    try {
      const { body } = httpRequest;
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
