import CreateUserUsecase from "./createUser/createUserUsecase";
import UserRepo from "../../../infra/repositories/user/userRepo";
import { v4 as uuidv4 } from 'uuid';
import hashPassword from "../../../utils/helpers/hashPassword/hashPassword";

const userDb = new UserRepo()

const createUserUsecase = new CreateUserUsecase(userDb, uuidv4, hashPassword);

export { createUserUsecase }
