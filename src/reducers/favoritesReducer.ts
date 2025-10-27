import { type ReducerActionType } from "./ReducerActionType";

export interface FavoritesType {
  items: Record<number, boolean>; // movieId → favorited?
}

export const favoritesInitialState: FavoritesType = {
  items: (() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : {};
  })(),
};

export const favoritesReducer = (
  state: FavoritesType,
  action: ReducerActionType
): FavoritesType => {
  switch (action.type) {
    case "TOGGLE_FAVORITE": {
      const id = action.payload.id as number;
      const updated = { ...state.items, [id]: !state.items[id] };
      localStorage.setItem("favorites", JSON.stringify(updated));
      return { ...state, items: updated };
    }

    case "CLEAR_FAVORITES":
      localStorage.removeItem("favorites");
      return { ...state, items: {} };

    default:
      return state;
  }
};
