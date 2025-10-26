import { type ReducerActionType } from "./ReducerActionType";

export interface SearchType {
  status: string;
}

export const searchInitialState: SearchType = { status: "" };

export const searchReducer = (state: SearchType, action: ReducerActionType) => {
  if (action.type === "CHANGE_SEARCH") {
    return { ...state, status: action.payload.status };
  }
  return state;
};
