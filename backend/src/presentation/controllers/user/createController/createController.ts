import { createUserUsecase } from "../../../../main/usecases/user";
import { InvalidParamError } from "../../../../utils/errors";

export default class CreateUserController {
  async route(httpRequest: any) {
    try {
      const { body } = httpRequest

      if (!body) return new InvalidParamError({ message: "Invalid data format" }, 400)

      const user = await createUserUsecase.execute(body.userData)
      console.log(user)

      return {
        statusCode: user.statusCode,
        body: user.body
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
