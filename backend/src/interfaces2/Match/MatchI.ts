import { ServerError } from "../../utils/errors";

interface MatchI {
  id: string;
  name: string;
  password?: string;
  category: string;
  maxPlayers: number;
  creatorId: string;
}

interface MatchEntityI {
  create: (props: MatchI) => any;
}

interface OkResponse {
  statusCode: 200,
  body: any
}

interface CreateMatchUsecaseI {
  execute: (matchData: MatchI) => Promise<OkResponse | typeof Error>
}

interface MatchRepoI {
  create: (matchData: MatchI) => Promise<MatchI | ServerError>;
  findByCreatorId: (creatorId: string) => Promise<MatchI[] | ServerError | null>;
  findMatchByStatusAndCreatorId: (
    creatorId: string,
    status: string,
  ) => Promise<MatchI[] | ServerError | null>;
}

export { MatchI, MatchEntityI, MatchRepoI, CreateMatchUsecaseI };
