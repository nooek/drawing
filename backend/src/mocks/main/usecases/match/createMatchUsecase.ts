import Match from "../../../../domain/entities/matchEntity/MatchEntity";
import { InvalidParamError, MissingParamError } from "../../../../utils/errors";
import { mockHash } from "../../../helpers/hashPasswordMock";
import { mockCreate } from "../../../infra/match/matchDbMock";

const makeEntity = (params: any) => {
  const match = new Match(() => "fakeid", InvalidParamError, MissingParamError);
  return {
    create: () => match.create(params),
  };
};

export const mockExecute = jest.fn(async (matchData) => {
  const matchEntity = await makeEntity(matchData).create();
  if (matchEntity instanceof Error) return matchEntity;

  const hashedPassword = mockHash(matchEntity.getPassword());

  const createdMatch = await mockCreate({
    id: matchEntity.getId(),
    name: matchEntity.getName(),
    password: hashedPassword || null,
    category: matchEntity.getCategory(),
    maxPlayers: matchEntity.getMaxPlayers(),
    creatorId: matchEntity.getCreatorId(),
  });
  if (createdMatch instanceof Error) return createdMatch;

  return {
    statusCode: 200,
    body: {
      id: matchEntity.getId(),
      name: matchEntity.getName(),
      category: matchEntity.getCategory(),
      maxPlayers: matchEntity.getMaxPlayers(),
    },
  };
});

const mock = jest.fn().mockImplementation(() => {
  return {
    execute: mockExecute,
  };
});

export default mock;
