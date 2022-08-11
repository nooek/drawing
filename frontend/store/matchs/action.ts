export const matchsActionTypes = {
  ADD_MATCH: "ADD_MATCH"
}

export interface MatchI {
  id: string;
  name: string;
  category: string;
  maxPlayers: number;
}

interface AddMatchI {
  type: string,
  match: MatchI
}

export const addMatch = (newMatch: MatchI): AddMatchI => {
  return { type: matchsActionTypes.ADD_MATCH, match: newMatch }
}
