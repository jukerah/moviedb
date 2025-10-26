import { useContext } from "react";
import { Context } from "../contexts";

/**
 * Hook that provides global access to the search state and its updater function.
 *
 * This hook connects to the shared application context, allowing any component
 * to read and modify the current search value without prop drilling.
 *
 * ---
 * ### 💡 Usage
 * ```tsx
 * const { search, setSearch } = useSearch();
 *
 * <input
 *   value={search}
 *   onChange={(e) => setSearch(e.target.value)}
 *   placeholder="Search for a movie..."
 * />
 * ```
 *
 * ---
 * @returns {{
 *   search: string;
 *   setSearch: (newValue: string) => void;
 * }} An object containing:
 * - `search`: The current global search value.
 * - `setSearch`: Function to update the global search value.
 *
 * @throws {Error} If used outside of a `<ContextProvider>`.
 */
export const useSearch = (): {
  search: string;
  setSearch: (newValue: string) => void;
} => {
  const { ctx, dispatch } = useContext(Context);
  const search = ctx.search.status;

  /**
   * Updates the global search value stored in Context.
   *
   * @param {string} newValue - The new search value to be stored globally.
   */
  const setSearch = (newValue: string) => {
    dispatch({
      type: "CHANGE_SEARCH",
      payload: { status: newValue },
    });
  };

  return { search, setSearch };
};
