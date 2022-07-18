import { createUserUsecase } from "../../../../main/usecases/user";

export default class CreateUserController {
  async route(httpRequest: any) {
    try {
      const { body } = httpRequest
      const user = await createUserUsecase.execute(body.userData)

      return {
        statusCode: 200,
        body: user
      }
    } catch(e: any) {
      console.log(e)
      return {
        statusCode: e.statusCode,
        body: e.body
      }
    }
  }
}
