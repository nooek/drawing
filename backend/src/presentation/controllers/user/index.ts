import { loginUsecase, authUsecase } from "../../../main/usecases/user";
import { InvalidParamError } from "../../../utils/errors";
import LoginController from "./loginController/loginController";
import AuthController from "./authController/authController";

const loginController = new LoginController(loginUsecase, InvalidParamError)
const authController = new AuthController(loginUsecase)

export {
  loginController,
  authController
}
