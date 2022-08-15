import { HYDRATE, createWrapper } from "next-redux-wrapper"
import { applyMiddleware, combineReducers } from "redux"
import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import matchs from "./matchs/reducer"

const combinedReducers = combineReducers({
  matchs
})

const masterReducer = (state: any | undefined, action: any): any => {
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

type Store = ReturnType<typeof initStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
 >;
export const wrapper = createWrapper(initStore)
