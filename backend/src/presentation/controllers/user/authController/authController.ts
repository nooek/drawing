export default class AuthController {
  authUsecase: any;

  constructor(authUsecase: any) {
    this.authUsecase = authUsecase;
  }

  async route(httpRequest: any) {
    try {
      const authorization = httpRequest.req.headers["authorization"];

      console.log(authorization)
      const user = await this.authUsecase.execute(authorization);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (e: any) {
      console.log(e)
      return {
        statusCode: e.statusCode ? e.statusCode : 500,
        body: e.body ? e.body : e,
      };
    }
  }
}
