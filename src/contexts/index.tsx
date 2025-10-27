import { createContext, useReducer } from "react";

import {
  type ReducerActionType,
  type SearchType,
  searchInitialState,
  searchReducer,
  type FavoritesType,
  favoritesReducer,
  favoritesInitialState,
} from "../reducers";

interface initialStateType {
  search: SearchType;
  favorites: FavoritesType;
}

interface ContextType {
  ctx: initialStateType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: React.Dispatch<any>;
}

const initialState = {
  search: searchInitialState,
  favorites: favoritesInitialState,
};

const Context = createContext<ContextType>({
  ctx: initialState,
  dispatch: () => null,
});

const mainReducer = (state: initialStateType, action: ReducerActionType) => ({
  search: searchReducer(state.search, action),
  favorites: favoritesReducer(state.favorites, action),
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
