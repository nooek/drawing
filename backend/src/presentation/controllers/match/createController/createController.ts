export default class createMatchController {
  private createMatchUsecase: any;
  private InvalidParamError: any;

  constructor(createMatchUsecase: any, InvalidParamError: any) {
    this.createMatchUsecase = createMatchUsecase;
    this.InvalidParamError = InvalidParamError;
  }

  async route(httpRequest: any) {
    try {
      const { body } = httpRequest

      if (!body) return new this.InvalidParamError({ message: "Invalid data format" }, 400)

      const match = await this.createMatchUsecase.execute(body.matchData)
      console.log(match)

      return {
        statusCode: match.statusCode,
        body: match.body
      }
    } catch(e: any) {
      console.log(e)
      return {
        statusCode: e.statusCode ? e.statusCode : 500,
        body: e.body ? e.body : e,
      }
    }
  }
}