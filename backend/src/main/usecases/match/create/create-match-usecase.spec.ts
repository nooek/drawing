import Match from "../../../../domain/entities/matchEntity/MatchEntity";
import { mockHash } from "../../../../mocks/helpers/hashPasswordMock";
import { mockCreate } from "../../../../mocks/infra/match/matchDbMock";
import { mockExecute } from "../../../../mocks/main/usecases/match/createMatchUsecase";
import { InvalidParamError, MissingParamError } from "../../../../utils/errors";
import CreateMatchUsecase from "./createMatchUsecase";

jest.mock("./createMatchUsecase.ts", () => {
  return jest.fn().mockImplementation(() => {
    return { execute: mockExecute };
  });
});
