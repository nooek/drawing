export default class GetMatchController {
  private getMatchUsecase: any;
  private InvalidParamError: any;
  private ServerError: any;

  constructor(getMatchUsecase: any, InvalidParamError: any, ServerError: any) {
    this.getMatchUsecase = getMatchUsecase;
    this.InvalidParamError = InvalidParamError;
    this.ServerError = ServerError
  }

  async route(request: any) {
    try {
      const { params } = request;

      if (!params) return new this.InvalidParamError({ message: "Invalid data format" }, 400);
      if (!request.extraParams.method) return new this.ServerError(500)

      const match = await this.getMatchUsecase.execute(request.extraParams.method, params.id);
    
      return {
        statusCode: match.statusCode,
        body: match.body,
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
