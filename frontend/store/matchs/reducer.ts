import { matchsActionTypes, MatchI } from "./action";

const matchsInitialState = {
  matchs: []
}

export default function reducer(state = matchsInitialState, action) {
  switch(action.type) {
    case matchsActionTypes.ADD_MATCH: {
      return { ...state, matchs: [...state.matchs, action.match] }
    }
    default:
      return state
  }
}