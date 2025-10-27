import { useContext } from "react";
import { Context } from "../contexts";

/**
 * Hook that provides global access to favorite movies and functions to manage them.
 *
 * This hook connects to the global application context, allowing components to
 * read, toggle, and clear favorite movies without prop drilling.
 *
 * ---
 * ### 💡 Usage
 * ```tsx
 * const { favorites, toggleFavorite, clearFavorites } = useFavorites();
 *
 * // Toggle a favorite movie
 * toggleFavorite(123);
 *
 * // Check if a movie is marked as favorite
 * const isFavorite = !!favorites[123];
 *
 * // Clear all favorites
 * clearFavorites();
 * ```
 *
 * ---
 * @returns {{
 *   favorites: Record<number, boolean>;
 *   toggleFavorite: (id: number) => void;
 *   clearFavorites: () => void;
 * }} An object containing:
 * - `favorites`: Map of movie IDs and their favorite status (`true` if favorited)
 * - `toggleFavorite`: Function to add or remove a movie from favorites
 * - `clearFavorites`: Function to remove all favorites
 *
 * @throws {Error} If used outside of a `<ContextProvider>`.
 */
export const useFavorites = (): {
  favorites: Record<number, boolean>;
  toggleFavorite: (id: number) => void;
  clearFavorites: () => void;
} => {
  const { ctx, dispatch } = useContext(Context);
  const favorites = ctx.favorites.items;

  /**
   * Toggles the favorite status of a given movie.
   *
   * @param {number} id - The TMDB movie ID to toggle.
   */
  const toggleFavorite = (id: number) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: { id } });
  };

  /**
   * Removes all movies from the favorites list.
   */
  const clearFavorites = () => {
    dispatch({ type: "CLEAR_FAVORITES", payload: {} });
  };

  return { favorites, toggleFavorite, clearFavorites };
};
