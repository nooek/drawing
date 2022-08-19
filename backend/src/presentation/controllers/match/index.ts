import { createMatchUsecase, getMatchUsecase } from "../../../main/usecases/match";
import { InvalidParamError, ServerError } from "../../../utils/errors";
import CreateMatchController from "./createController/createController";
import GetMatchController from "./getController/getMatchController";

const createMatchController = new CreateMatchController(createMatchUsecase)
const getMatchController = new GetMatchController(getMatchUsecase, InvalidParamError, ServerError)

export {
  createMatchController,
  getMatchController
}
