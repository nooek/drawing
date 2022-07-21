import CreateUserUsecase from "./createUser/createUserUsecase";
import LoginUsecase from "./login/loginUsecase";
import AuthUsecase from "./auth/authUsecase";

import UserRepo from "../../../infra/repositories/user/userRepo";

import TokenGenerator from "../../../utils/helpers/tokenGenerator/tokenGenerator";
import HashPassword from "../../../utils/helpers/hashPassword/hashPassword";

import { InvalidParamError, MissingParamError, ServerError, UnauthorizedError } from "../../../utils/errors";

import { v4 as uuidv4 } from 'uuid';

const userDb = new UserRepo()

const hashPassword = new HashPassword
const tokenGenerator = new TokenGenerator

const createUserUsecase = new CreateUserUsecase(userDb, uuidv4, hashPassword, UnauthorizedError);
const loginUsecase = new LoginUsecase(userDb, tokenGenerator, hashPassword, MissingParamError, InvalidParamError, UnauthorizedError)
const authUsecase = new AuthUsecase(userDb, tokenGenerator, MissingParamError)

export { 
  createUserUsecase,
  loginUsecase,
  authUsecase
}
