export type TMDBMovieDetailsType = {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string | null;
  genres: Array<{
    id: number;
    name: string;
  }>;
};
