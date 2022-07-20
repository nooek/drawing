import { loginUsecase } from "../../../main/usecases/user";
import LoginController from "./loginController/loginController";

const loginController = new LoginController(loginUsecase)

export {
  loginController
}
