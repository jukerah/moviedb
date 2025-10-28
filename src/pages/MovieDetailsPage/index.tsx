import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";

import type { TMDBMovieDetailsType } from "../../types/TMDBMovieDetailsType";
import { useFavorites } from "../../hooks/useFavorites";
import { fetchMovieDetails } from "../../services";
import { VoteAverageBadge } from "../../components/VoteAverageBadge";
import { GenresList } from "../../components/GenresList";

/**
 * MovieDetailsPage component
 *
 * Displays detailed information about a specific movie fetched from TMDB.
 * It includes movie metadata such as title, genres, release date, rating,
 * and synopsis, along with an interactive button to add or remove the movie
 * from the favorites list.
 *
 * ---
 * ### 🎬 Features
 * - Fetches movie details from TMDB using the `fetchMovieDetails` service.
 * - Displays detailed information including:
 *   - Backdrop image
 *   - Title and genres
 *   - Release date and TMDB rating
 *   - Synopsis (overview)
 * - Allows toggling a movie as favorite using the global `useFavorites` context.
 * - Provides full loading and error states for user feedback.
 *
 * ---
 * ### ♿ Accessibility
 * - Each image includes descriptive `alt` text for screen readers.
 * - The favorite button uses `aria-pressed` to indicate state.
 * - The layout adapts responsively for both mobile and desktop screens.
 *
 * ---
 * ### 💡 Usage
 * ```tsx
 * import MovieDetailsPage from "@/pages/MovieDetailsPage";
 *
 * // Example route in React Router
 * <Route path="/movie/:id" element={<MovieDetailsPage />} />
 * ```
 *
 * ---
 * @returns {JSX.Element} The movie details page containing all movie information,
 * a backdrop image, synopsis, and a favorite button.
 */
const MovieDetailsPage = () => {
  const { id } = useParams();
  const { favorites, toggleFavorite } = useFavorites();
  const [movie, setMovie] = useState<TMDBMovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch movie details when ID changes
  useEffect(() => {
    if (!id) return;
    loadMovie();
  }, [id]);

  /**
   * Fetches detailed information about the selected movie.
   *
   * Handles loading, error, and success states.
   * Stores data in the local `movie` state.
   */
  const loadMovie = async () => {
    try {
      const res = await fetchMovieDetails(Number(id));
      setMovie(res.data);
    } catch (err) {
      setError("Não foi possível carregar os detalhes do filme.");
    } finally {
      setLoading(false);
    }
  };

  // Loading and error handling
  if (loading) {
    return (
      <section className={styles.wrapper}>
        <p>Carregando detalhes do filme...</p>
      </section>
    );
  }

  if (error || !movie) {
    return (
      <section className={styles.wrapper}>
        <p className={styles.error}>{error ?? "Filme não encontrado."}</p>
      </section>
    );
  }

  // Derived values
  const isFavorite = !!favorites[movie.id];
  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  const releaseDate = new Date(movie.release_date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Main render
  return (
    <section className={styles.container}>
      {/* Backdrop */}
      <div className={styles.backdrop}>
        {backdrop ? (
          <img
            src={backdrop}
            alt={`Imagem do filme ${movie.title}`}
            className={styles.backdropImg}
          />
        ) : (
          <div className={styles.backdropPlaceholder}>Imagem Backdrop</div>
        )}
      </div>

      {/* Movie Info */}
      <div className={styles.info}>
        <h1 className={styles.title}>{movie.title}</h1>

        {/* Genres */}
        <GenresList genres={movie.genres} />

        {/* Release date and rating */}
        <p className={styles.meta}>
          <strong>Data de lançamento:</strong> {releaseDate}
        </p>

        <p className={styles.meta}>
          <strong>Nota TMDB:</strong>{" "}
          <VoteAverageBadge value={movie.vote_average} />
        </p>

        {/* Overview */}
        <h2 className={styles.subtitle}>Sinopse</h2>
        <p className={styles.overview}>
          {movie.overview || "Sinopse não disponível."}
        </p>

        {/* Favorite button */}
        <button
          className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ""}`}
          onClick={() => toggleFavorite(movie.id)}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
        >
          ❤ {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
        </button>
      </div>
    </section>
  );
};

export default MovieDetailsPage;
