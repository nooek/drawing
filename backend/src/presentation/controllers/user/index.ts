import { loginUsecase, authUsecase } from "../../../main/usecases/user";
import { InvalidParamError, MissingParamError } from "../../../utils/errors";
import LoginController from "./loginController/loginController";
import AuthController from "./authController/authController";

const loginController = new LoginController(loginUsecase, MissingParamError)
const authController = new AuthController(authUsecase)

export {
  loginController,
  authController
}
