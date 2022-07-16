import CreateUserUsecase from "./createUser/createUserUsecase";
import UserRepo from "../../../infra/repositories/user/userRepo";
import { v4 as uuidv4 } from 'uuid';
import HashPassword from "../../../utils/helpers/hashPassword/hashPassword";
import { UnauthorizedError } from "../../../utils/errors";

const userDb = new UserRepo()

const createUserUsecase = new CreateUserUsecase(userDb, uuidv4, new HashPassword, UnauthorizedError);

export { createUserUsecase }
