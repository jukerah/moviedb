import styles from "./styles.module.css";

type GenresListProps = {
  genres: { id: number; name: string }[];
};

/**
 * GenresList component that renders a horizontal list of movie genres.
 *
 * It is typically used inside movie cards or detail pages to visually represent
 * the genres associated with a specific TMDB movie.
 *
 * ---
 * ### Behavior
 * - Genres are displayed in a compact and responsive layout.
 * - The component automatically hides when no genres are provided.
 * - Provides `aria-label` to improve accessibility for assistive technologies.
 *
 * ---
 * ### Props
 * @typedef {Object} GenresListProps
 * @property {Array<{id: number, name: string}>} genres - An array of genre objects returned by TMDB API.
 *
 * @component
 * @example
 * ```tsx
 * <GenresList genres={[{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }]} />
 * ```
 *
 * @returns {JSX.Element | null} A styled group of genre tags or null if no genres exist.
 */
export const GenresList = ({ genres }: GenresListProps) => {
  if (!genres?.length) return <></>;

  return (
    <div className={styles.genres} aria-label="Gêneros do filme">
      {genres.map((genre) => (
        <span key={genre.id} className={styles.genre}>
          {genre.name}
        </span>
      ))}
    </div>
  );
};
