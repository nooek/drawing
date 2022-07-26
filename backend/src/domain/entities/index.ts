import emailValidator from "../../validators/emailValidator/emailValidator";
import passwordValidator from "../../validators/passwordValidator/passwordValidator";
import { v4 as uuidv4 } from 'uuid';
import { InvalidParamError, MissingParamError } from "../../utils/errors";
import User from "./userEntity/UserEntity";
import Match from "./matchEntity/MatchEntity";

const user = new User(emailValidator, passwordValidator, uuidv4, InvalidParamError, MissingParamError)
const match = new Match(uuidv4, InvalidParamError, MissingParamError)

export {
  user,
  match
}
