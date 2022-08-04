import CreateMatchUsecase from "./create/createMatchUsecase";

import { match } from "../../../domain/entities";

import MatchRepo from "../../../infra/repositories/match/matchRepo";

import { v4 as uuidv4 } from 'uuid';
import HashPassword from "../../../utils/helpers/hashPassword/hashPassword";

const matchDb = new MatchRepo()
const hashPassword = new HashPassword

const createMatchUsecase = new CreateMatchUsecase(match, matchDb, uuidv4, hashPassword)

export { createMatchUsecase }
