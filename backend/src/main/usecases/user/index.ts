import CreateUserUsecase from "./createUser/createUserUsecase";
import LoginUsecase from "./login/loginUsecase";
import UserRepo from "../../../infra/repositories/user/userRepo";
import { v4 as uuidv4 } from 'uuid';
import HashPassword from "../../../utils/helpers/hashPassword/hashPassword";
import TokenGenerator from "../../../utils/helpers/tokenGenerator/tokenGenerator";
import { InvalidParamError, MissingParamError, ServerError, UnauthorizedError } from "../../../utils/errors";

const userDb = new UserRepo()

const hashPassword = new HashPassword
const tokenGenerator = new TokenGenerator

const createUserUsecase = new CreateUserUsecase(userDb, uuidv4, hashPassword, UnauthorizedError);
const loginUsecase = new LoginUsecase(userDb, tokenGenerator, hashPassword, MissingParamError, InvalidParamError, UnauthorizedError)

export { 
  createUserUsecase,
  loginUsecase
}
