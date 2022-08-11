import { HYDRATE, createWrapper } from "next-redux-wrapper"
import { configureStore } from "@reduxjs/toolkit"
import { applyMiddleware, combineReducers } from "redux"
import matchs from "./matchs/reducer"

const combinedReducers = combineReducers({
  matchs
})

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      matchs: {
        matchs: [{...action.payload.matchs.matchs, ...state.matchs.matchs}]
      }
    }
    return nextState
  } else {
    return combinedReducers(state, action)
  }
}

const initStore = () => {
  return configureStore({ reducer: masterReducer })
}

export const wrapper = createWrapper(initStore)
