import axios from "axios";

export const fetchPopularMovies = (page = 1) => {
  const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;

  return axios.get(
    `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=${page}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_KEY}`,
      },
    }
  );
};
