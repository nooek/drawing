export default class AuthController {
  authUsecase: any;

  constructor(authUsecase: any) {
    this.authUsecase = authUsecase;
  }

  async route(httpRequest: any) {
    try {
      const { token } = httpRequest.req.headers;

      const user = await this.authUsecase.execute(token);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (e: any) {
      return {
        statusCode: e.statusCode ? e.statusCode : 500,
        body: e.body ? e.body : e,
      };
    }
  }
}
