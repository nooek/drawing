import emailValidator from "../../validators/emailValidator/emailValidator";
import passwordValidator from "../../validators/passwordValidator/passwordValidator";
import { v4 as uuidv4 } from 'uuid';
import { InvalidParamError } from "../../utils/errors";
import User from "./userEntity/UserEntity";

const user = new User(emailValidator, passwordValidator, uuidv4, InvalidParamError)

export {
  user 
}
