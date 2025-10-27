import axios from "axios";

export const fetchMovieDetails = (id: number) => {
  const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;

  return axios.get(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_KEY}`,
    },
  });
};
