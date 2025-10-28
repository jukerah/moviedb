import styles from "./styles.module.css";

type GenresListProps = {
  genres: { id: number; name: string }[];
};

/**
 * GenresList component
 *
 * Renders a list of movie genres in a styled row.
 *
 * @param genres - TMDB genres array
 */
export const GenresList = ({ genres }: GenresListProps) => {
  if (!genres?.length) return null;

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
