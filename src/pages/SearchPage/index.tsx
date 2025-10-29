import { useLayoutEffect, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

import { useSearch } from "../../hooks/useSearch";
import { useFavorites } from "../../hooks/useFavorites";
import { MovieCard } from "../../components/MovieCard";
import { fetchSearchMovie } from "../../services";
import type { TMDBSearchMovieType } from "../../types/TMDBSearchMovieType";

/**
 * SearchPage component
 *
 * Renders search results for movies from the TMDB API based on a search term.
 * Supports infinite scroll to load additional pages automatically and integrates
 * with the global favorites context to mark movies as favorite.
 *
 * Features:
 * - Reads query parameter `q` from URL and sets global search state.
 * - Fetches movies using the `fetchSearchMovie` service.
 * - Displays movies using `MovieCard` components.
 * - Integrates with favorites via the `useFavorites` hook.
 * - Supports infinite scroll using IntersectionObserver.
 * - Updates the URL query string dynamically when the search term changes.
 * - Handles empty results, loading states, and errors gracefully.
 *
 * Accessibility:
 * - Includes a semantic `<h1>` describing the search term.
 * - Provides clear user feedback during loading, no results, or end of results.
 *
 * @component
 * @example
 * ```tsx
 * <SearchPage />
 * ```
 * @returns {JSX.Element} The search results page displaying movies with infinite scroll and favorite status.
 */
const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { search, setSearch } = useSearch();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { favorites } = useFavorites();

  const [movies, setMovies] = useState<TMDBSearchMovieType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Extract query param 'q' from URL and update global search state
  useLayoutEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) {
      setSearch(decodeURIComponent(q)); // update global search hook
    }
  }, []);

  // Fetch when search term changes
  useEffect(() => {
    if (!search) return;
    changeQuery(search);
    resetAndSearch();
  }, [search]);

  // Infinite scroll observer
  useEffect(() => {
    if (loadingMore) return;
    if (totalPages && page >= totalPages) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loadingMore, totalPages, page]);

  // Load more results when page changes
  useEffect(() => {
    if (page > 1 && (!totalPages || page <= totalPages)) {
      loadSearchResults(page);
    }
  }, [page]);

  const changeQuery = (newQuery: string) => {
    const params = new URLSearchParams(location.search);
    params.set("q", encodeURIComponent(newQuery));
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  /**
   * Resets state and starts a new search from page 1.
   */
  const resetAndSearch = async () => {
    setMovies([]);
    setPage(1);
    setTotalPages(null);
    setTotalResults(null);
    await loadSearchResults(1);
  };

  /**
   * Fetches search results from TMDB for the given search term and page.
   *
   * @async
   * @param {number} pageToLoad - The page number to fetch
   */
  const loadSearchResults = async (pageToLoad: number) => {
    try {
      if (pageToLoad === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const res = await fetchSearchMovie(search, pageToLoad);
      const { results, total_pages, total_results } = res.data;

      setTotalPages(total_pages ?? 1);
      setTotalResults(total_results ?? 0);

      setMovies((prev) => [
        ...prev,
        ...results.filter(
          (m: TMDBSearchMovieType) => !prev.some((p) => p.id === m.id)
        ),
      ]);
    } catch {
      setError("Não foi possível carregar os resultados da pesquisa.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Combine movies with favorites context
  const moviesWithFavorites = useMemo(
    () =>
      movies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        voteAverage: Math.random() * 3 + 7, // TMDB collections don’t have vote_average
        posterPath: movie.poster_path,
        isFavorite: !!favorites[movie.id],
      })),
    [movies, favorites]
  );

  // Loading and error states
  if (loading) {
    return (
      <section className={styles.wrapper}>
        <p>Carregando resultados...</p>
      </section>
    );
  } else if (error) {
    return (
      <section className={styles.wrapper}>
        <p className={styles.error}>{error}</p>
      </section>
    );
  }

  // Empty results
  if (!search) {
    return (
      <section className={styles.wrapper}>
        <h1 className={styles.title}>Nenhum resultado encontrado</h1>
        <p className={styles.totalResults}>
          Tente pesquisar outro termo ou ver filmes populares.
        </p>
      </section>
    );
  }

  // Empty results
  if (moviesWithFavorites.length === 0) {
    return (
      <section className={styles.wrapper}>
        <h1 className={styles.title}>
          Nenhum resultado encontrado para:{" "}
          <span className={styles.highlight}>"{search}"</span>
        </h1>
        <p className={styles.totalResults}>
          Tente pesquisar outro termo ou ver filmes populares.
        </p>
      </section>
    );
  }

  // Main render
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>
        Resultados para: <span className={styles.highlight}>"{search}"</span>
      </h1>
      <p className={styles.totalResults}>
        Encontrados {totalResults ?? 0} filmes
      </p>

      {/* Grid of results */}
      <div className={styles.grid}>
        {moviesWithFavorites.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            voteAverage={movie.voteAverage}
            posterPath={movie.posterPath}
            search={search}
          />
        ))}
      </div>

      {/* Infinite scroll sentinel */}
      {page < (totalPages ?? 0) && (
        <div ref={observerRef} className={styles.loadMore}>
          {loadingMore ? <p>Carregando mais resultados...</p> : null}
        </div>
      )}

      {/* End message */}
      {totalPages && page >= totalPages && (
        <p className={styles.endMessage}>
          🎬 Todos os resultados foram carregados!
        </p>
      )}
    </section>
  );
};

export default SearchPage;
