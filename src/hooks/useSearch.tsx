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
 * const [search, setSearch] = useSearch();
 *
 * <input
 *   value={search}
 *   onChange={(e) => setSearch(e.target.value)}
 *   placeholder="Search for a movie..."
 * />
 * ```
 *
 * ---
 * @returns {[string, (newValue: string) => void]} A tuple containing:
 * - `value`: Current global search value.
 * - `setValue`: Function to update the global search value.
 *
 * @throws {Error} If used outside of a `<ContextProvider>`.
 */
export const useSearch = (): [string, (newValue: string) => void] => {
  const { ctx, dispatch } = useContext(Context);
  const value = ctx.search.status;

  /**
   * Updates the global search value stored in Context.
   *
   * @param {string} newValue - The new search value to be stored globally.
   */
  const setValue = (newValue: string) => {
    dispatch({
      type: "CHANGE_SEARCH",
      payload: { status: newValue },
    });
  };

  return [value, setValue];
};
