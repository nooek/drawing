import { BaseResponseConstructor } from "../../../../utils/errors/interfaces";

export default class createMatchController {
  private createMatchUsecase: any;

  constructor(createMatchUsecase: any) {
    this.createMatchUsecase = createMatchUsecase;
  }

  async route(httpRequest: any) {
    try {
      const { body } = httpRequest

      const match = await this.createMatchUsecase.execute(body)

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