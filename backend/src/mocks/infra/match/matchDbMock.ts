import { ServerError } from "../../../utils/errors";
import Match from "../mockDb";

export const createdMatchs = new Match([]);

export const mockCreate = jest.fn((matchData) => {
  if (!matchData.id) return new ServerError(500);
  if (!matchData.name) return new ServerError(500);
  if (!matchData.password) return new ServerError(500);
  if (!matchData.category) return new ServerError(500);
  if (!matchData.maxPlayers) return new ServerError(500);
  if (!matchData.creatorId) return new ServerError(500);

  const newMatch = {
    id: matchData.id,
    name: matchData.name,
    password: matchData.password,
    category: matchData.category,
    maxPlayers: matchData.maxPlayers,
    creatorId: matchData.creatorId,
  };

  createdMatchs.setInstance(newMatch);
  return newMatch;
});

export const mockFindByCreatorId = jest.fn((creatorId?: string) => {
  if (!creatorId) return new ServerError(500);

  const match = createdMatchs.find("creatorId", creatorId);

  if (!match[0]) return null;
  if (!match[0].id) return null;

  return {
    id: match[0].id,
    name: match[0].email,
    password: match[0].name,
    category: match[0].password,
    maxPlayers: match[0].maxPlayers,
    creatorId: match[0].creatorId
  };
});

const mock = jest.fn().mockImplementation(() => {
  return {
    create: mockCreate,
    findByEmail: mockFindByCreatorId,
  };
});

export default mock;
