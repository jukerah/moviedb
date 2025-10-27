import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./styles.module.css";

import type { TMDBPopularMovieType } from "../../types/TMDBPopularMovieType";
import { MovieCard } from "../../components/MovieCard";
import { useFavorites } from "../../hooks/useFavorites";
import { fetchPopularMovies } from "../../services";

/**
 * HomePage component
 *
 * Renders a grid of popular movies fetched from the TMDB API.
 * Supports infinite scroll functionality by automatically loading
 * additional pages as the user scrolls down.
 *
 * Features:
 * - Fetches movies from TMDB using the `fetchPopularMovies` service.
 * - Displays movie cards using the `MovieCard` component.
 * - Integrates with the global favorites context via `useFavorites`.
 * - Uses Intersection Observer to handle infinite scroll behavior.
 * - Displays proper loading and error states.
 *
 * Accessibility:
 * - Includes a hidden `<h1>` for SEO and screen readers.
 * - Provides clear user feedback during loading and completion.
 *
 * @component
 * @example
 * ```tsx
 * <HomePage />
 * ```
 * @returns {JSX.Element} The main home page showing popular movies with infinite scroll.
 */
const HomePage = () => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { favorites } = useFavorites();
  const [movies, setMovies] = useState<TMDBPopularMovieType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // INITIAL FETCH (on mount)
  useEffect(() => {
    // Fetch the first page of popular movies as soon as the component mounts.
    loadMovies(1);
  }, []);

  // INFINITE SCROLL OBSERVER
  useEffect(() => {
    // Avoid creating an observer if already loading or if we've reached the last page.
    if (loadingMore) return;
    if (totalPages && page >= totalPages) return;

    // Create the IntersectionObserver to track when the sentinel element enters the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        // When the sentinel becomes visible, trigger the next page load.
        if (first.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 } // Trigger when the sentinel is fully visible.
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    // Cleanup observer when component unmounts or dependencies change.
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loadingMore, totalPages, page]);

  // FETCH MOVIES ON PAGE CHANGE
  useEffect(() => {
    // When `page` increments (due to scroll), fetch the next batch of movies.
    if (page > 1 && (!totalPages || page <= totalPages)) {
      loadMovies(page);
    }
  }, [page]);

  /**
   * Fetches popular movies from TMDB for a specific page number.
   *
   * Handles both initial and subsequent requests, manages loading states,
   * and appends results to the existing movie list while avoiding duplicates.
   *
   * @async
   * @param {number} pageToLoad - The page number to fetch.
   */
  const loadMovies = async (pageToLoad: number) => {
    try {
      // Set proper loading state depending on whether it’s the first page or subsequent ones.
      if (pageToLoad === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      // Perform the API call to fetch popular movies.
      const res = await fetchPopularMovies(pageToLoad);
      const { results, total_pages } = res.data;

      // Save the total number of pages (if available).
      if (total_pages) setTotalPages(total_pages);

      // Append new movies, ensuring no duplicates.
      setMovies((prev) => [
        ...prev,
        ...results.filter(
          (m: TMDBPopularMovieType) => !prev.some((p) => p.id === m.id)
        ),
      ]);
    } catch (err) {
      setError("Não foi possível carregar os filmes populares.");
    } finally {
      // Reset loading states once request finishes.
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // MEMOIZED MOVIES WITH FAVORITE STATUS
  const moviesWithFavorites = useMemo(
    () =>
      movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        voteAverage: movie.vote_average,
        posterPath: movie.poster_path,
        isFavorite: !!favorites[movie.id], // Marks the movie as favorite if present in context.
      })),
    [movies, favorites]
  );

  // LOADING & ERROR STATES
  if (loading) {
    return (
      <section className={styles.wrapper}>
        <p>Carregando filmes...</p>
      </section>
    );
  } else if (error) {
    return (
      <section className={styles.wrapper}>
        <p className={styles.error}>{error}</p>
      </section>
    );
  }

  // MAIN RENDER
  return (
    <section className={styles.wrapper} aria-labelledby="home-heading">
      <h1 id="home-heading" className={styles.hiddenH1}>
        Popular Movies
      </h1>

      {/* Movies grid */}
      <div className={styles.grid}>
        {moviesWithFavorites.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            voteAverage={movie.voteAverage}
            posterPath={movie.posterPath ?? undefined}
          />
        ))}
      </div>

      {/* Sentinel element observed by IntersectionObserver */}
      {page < (totalPages ?? 0) && (
        <div ref={observerRef} className={styles.loadMore}>
          {loadingMore ? <p>Carregando mais filmes...</p> : null}
        </div>
      )}

      {/* Message displayed when all pages are loaded */}
      {totalPages && page >= totalPages && (
        <p className={styles.endMessage}>
          🎬 Todos os filmes foram carregados!
        </p>
      )}
    </section>
  );
};

export default HomePage;
