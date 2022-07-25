interface MatchReturnI {
  getId: () => string;
  getName: () => string;
  getPassword: () => string;
  getCategory: () => string;
  getMaxPlayers: () => number;
  getCreatorId: () => string;
}

export default MatchReturnI
