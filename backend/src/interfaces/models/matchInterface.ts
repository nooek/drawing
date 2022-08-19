import { ServerError } from "../../utils/errors";

interface MatchI {
  id: string;
  name: string;
  password?: string;
  category: string;
  maxPlayers: number;
  status: string;
  creatorId: string;
}

interface MatchRepoI {
  create: (matchData: MatchI) => Promise<MatchI | ServerError>;
  findByCreatorId: (creatorId: string) => Promise<MatchI[] | ServerError | null>;
  findMatchByStatusAndCreatorId: (creatorId: string, status: string) => Promise<MatchI[] | ServerError | null>;
}

export { MatchI, MatchRepoI };
