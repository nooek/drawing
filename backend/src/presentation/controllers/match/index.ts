import { createMatchUsecase } from "../../../main/usecases/match";
import { InvalidParamError } from "../../../utils/errors";
import CreateMatchController from "./createController/createController";

const createMatchController = new CreateMatchController(createMatchUsecase, InvalidParamError)

export {
  createMatchController
}
