import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

import { useFavorites } from "../../hooks/useFavorites";
import { fetchMovieDetails } from "../../services";
import type { TMDBMovieDetailsType } from "../../types/TMDBMovieDetailsType";
import { MovieCard } from "../../components/MovieCard";
import { GenericSelect } from "../../components/textfields/GenericSelect";

/**
 * FavoritesPage component
 *
 * Displays a list of the user's favorite movies with sorting options and
 * the ability to remove items. If there are no favorites, shows an empty
 * state encouraging the user to explore popular movies.
 *
 * ---
 * ### Features
 * - Lists movies marked as favorites using the global `useFavorites` hook.
 * - Fetches minimal details for each favorite movie from TMDB.
 * - Allows sorting by title (A-Z/Z-A) or rating (high/low).
 * - Allows removing movies directly from the favorites list.
 * - Displays an empty state when no favorites exist.
 *
 * ---
 * ### Accessibility
 * - Uses proper ARIA labels for interactive elements.
 * - Buttons and links have descriptive labels for screen readers.
 * - Clear visual feedback on hover and focus states.
 *
 * ---
 * @returns {JSX.Element} The page displaying all favorited movies.
 */
const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const [movies, setMovies] = useState<TMDBMovieDetailsType[]>([]);
  const [sort, setSort] = useState("title-asc");
  const [loading, setLoading] = useState(true);

  // Load all favorite movies only once when the page mounts
  useEffect(() => {
    loadFavorites();
  }, []);

  /**
   * Fetches detailed information for all movies marked as favorites.
   *
   * This function:
   * - Reads all favorite movie IDs from the global `useFavorites` context.
   * - Fetches each movie's details from TMDB using `fetchMovieDetails`.
   * - Updates the local `movies` state with the fetched data.
   * - Handles empty favorites gracefully by clearing the list.
   * - Manages loading and error states to provide responsive feedback.
   *
   * @async
   * @function loadFavorites
   * @returns {Promise<void>} Resolves when all favorite movies are fetched and state is updated.
   */
  const loadFavorites = async () => {
    try {
      setLoading(true);

      // 🧩 Extract IDs of favorited movies
      const ids = Object.keys(favorites).filter((id) => favorites[+id]);

      // 💤 No favorites? Just clear the list and stop loading
      if (ids.length === 0) {
        setMovies([]);
        setLoading(false);
        return;
      }

      // 🎬 Fetch movie details in parallel
      const results = await Promise.all(
        ids.map(async (id) => {
          const res = await fetchMovieDetails(Number(id));
          return res.data as TMDBMovieDetailsType;
        })
      );

      // ✅ Save fetched favorites in local state
      setMovies(results);
    } catch {
      // ⚠️ Handle network or API errors gracefully
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Sort movies dynamically whenever user changes the sorting option
  const sortedMovies = useMemo(() => {
    const sorted = [...movies];
    switch (sort) {
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "rating-desc":
        sorted.sort((a, b) => b.vote_average - a.vote_average);
        break;
      case "rating-asc":
        sorted.sort((a, b) => a.vote_average - b.vote_average);
        break;
    }
    return sorted;
  }, [movies, sort]);

  // If no favorites exist after loading, show the empty state screen
  if (!loading && sortedMovies.length === 0) {
    return (
      <section className={styles.empty}>
        <div className={styles.icon}>🎬</div>
        <h2>Nenhum filme favorito ainda</h2>
        <p>Comece explorando filmes populares e adicione seus favoritos!</p>
        <Link to="/" className={styles.exploreBtn}>
          Explorar Filmes
        </Link>
      </section>
    );
  }

  // MAIN RENDER
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1>Meus Filmes Favoritos</h1>

        <GenericSelect
          id="sort"
          label="Ordenar por:"
          value={sort}
          labelPosition="left"
          onChange={(e) => setSort(e.target.value)}
          options={[
            { value: "title-asc", label: "Título (A-Z)" },
            { value: "title-desc", label: "Título (Z-A)" },
            { value: "rating-desc", label: "Nota (Alta)" },
            { value: "rating-asc", label: "Nota (Baixa)" },
          ]}
        />
      </header>

      {/* Movie grid with removable favorites */}
      {loading ? (
        <p>Carregando favoritos...</p>
      ) : (
        <div className={styles.grid}>
          {sortedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              voteAverage={movie.vote_average}
              posterPath={movie.poster_path}
              actionButton={{
                icon: "🗑️",
                label: "Remover dos favoritos",
                onClick: (id) => {
                  toggleFavorite(id);
                  // Immediately remove movie from list after un-favoriting
                  setMovies((prev) => prev.filter((m) => m.id !== id));
                },
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FavoritesPage;
