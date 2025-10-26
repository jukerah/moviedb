import { createContext, useReducer } from "react";

import {
  type ReducerActionType,
  type SearchType,
  searchInitialState,
  searchReducer,
} from "../reducers";

interface initialStateType {
  search: SearchType;
}

interface ContextType {
  ctx: initialStateType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: React.Dispatch<any>;
}

const initialState = {
  search: searchInitialState,
};

const Context = createContext<ContextType>({
  ctx: initialState,
  dispatch: () => null,
});

const mainReducer = (state: initialStateType, action: ReducerActionType) => ({
  search: searchReducer(state.search, action),
});

interface ContextProviderProps {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [ctx, dispatch] = useReducer(mainReducer, initialState);

  return (
    <Context.Provider value={{ ctx, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, ContextProvider };
