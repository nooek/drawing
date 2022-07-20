import { loginUsecase } from "../../../main/usecases/user";
import { InvalidParamError } from "../../../utils/errors";
import LoginController from "./loginController/loginController";

const loginController = new LoginController(loginUsecase, InvalidParamError)

export {
  loginController
}
