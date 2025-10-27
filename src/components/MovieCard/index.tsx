import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useFavorites } from "../../hooks/useFavorites";

type MovieCardProps = {
  id: number;
  title: string;
  voteAverage: number;
  posterPath?: string | null;
};

/**
 * MovieCard component that displays a single movie item.
 *
 * It shows:
 * - The movie poster (with link to the movie details page)
 * - The title (also linked)
 * - The TMDB rating badge
 * - A favorite button (heart icon) that toggles inclusion in the favorites list
 *
 * Behavior:
 * - Clicking the heart icon toggles the movie as favorite using the global `useFavorites` context.
 * - The poster and title both navigate to the movie's details page (`/movie/:id`).
 * - The component supports lazy loading of poster images.
 *
 * Accessibility:
 * - Each card is wrapped in an `<article>` with `aria-label` describing the movie.
 * - The favorite button uses `aria-pressed` to indicate state.
 * - The poster and title links include descriptive `aria-label`s for screen readers.
 *
 * Props:
 * @typedef {Object} MovieCardProps
 * @property {number} id - The unique movie ID from TMDB.
 * @property {string} title - The movie title.
 * @property {number} voteAverage - The average TMDB rating (0–10 scale).
 * @property {string | null} [posterPath] - Optional relative path to the movie poster image.
 *
 * @component
 * @example
 * ```tsx
 * <MovieCard
 *   id={603}
 *   title="The Matrix"
 *   voteAverage={8.7}
 *   posterPath="/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
 * />
 * ```
 *
 * @returns {JSX.Element} The styled movie card with poster, title, rating, and favorite button.
 */
export const MovieCard = ({
  id,
  title,
  voteAverage,
  posterPath,
}: MovieCardProps) => {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = !!favorites[id];
  const posterSrc = posterPath
    ? `https://image.tmdb.org/t/p/w300/${posterPath}`
    : undefined;

  return (
    <article className={styles.card} aria-label={`Filme: ${title}`}>
      <div className={styles.posterWrapper}>
        {posterSrc ? (
          <Link
            to={`/movie/${id}`}
            className={styles.title}
            aria-label={`Ver o pôster e detalhes do filme ${title}`}
          >
            <img
              src={posterSrc}
              alt={`Poster de ${title}`}
              className={styles.poster}
              loading="lazy"
            />
          </Link>
        ) : (
          <div className={styles.posterPlaceholder} aria-hidden="true">
            Poster do Filme
          </div>
        )}

        <button
          type="button"
          className={`${styles.favBtn} ${isFavorite ? styles.favActive : ""}`}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
          onClick={() => toggleFavorite(id)}
        >
          <span className={styles.favIcon} aria-hidden="true">
            ❤
          </span>
        </button>
      </div>

      <footer className={styles.cardFooter}>
        <Link
          to={`/movie/${id}`}
          className={styles.title}
          aria-label={`Abrir página de detalhes do filme ${title}`}
        >
          {title}
        </Link>
        <div>
          <span
            className={styles.badge}
            aria-label={`Nota TMDB ${voteAverage}`}
          >
            {voteAverage.toFixed(1)}
          </span>
        </div>
      </footer>
    </article>
  );
};
