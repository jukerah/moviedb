import axios from "axios";

export const fetchSearchMovie = (search: string, page: number) => {
  const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;

  return axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=pt-BR&page=${page}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_KEY}`,
      },
    }
  );
};
