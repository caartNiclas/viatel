import http, { API_DEFAULT_PARAMS } from "../http-common";
import IMovieGenres from "../types/Genres";
import IMovieData from "../types/Movie";

const getAll = () => {
  return http.get<Array<IMovieData>>("/movie/top_rated", {
    params: {
      ...API_DEFAULT_PARAMS,
      page: 1,
    },
  });
};

const getMovie = (movie_id: number) => {
  return http.get<Array<IMovieData>>(`/movie/${movie_id}`, {
    params: {
      ...API_DEFAULT_PARAMS,
    },
  });
};

const getSimilarMovies = (movie_id: number) => {
  return http.get<Array<IMovieData>>(`/movie/${movie_id}/similar`, {
    params: {
      ...API_DEFAULT_PARAMS,
    },
  });
};

const getGenres = () => {
  return http.get<Array<IMovieGenres>>("/genre/movie/list", {
    params: {
      ...API_DEFAULT_PARAMS,
    },
  });
};

const search = (query: string) => {
  return http.get<Array<IMovieGenres>>("/search/movie", {
    params: {
      ...API_DEFAULT_PARAMS,
      query,
    },
  });
};

const get = (id: any) => {
  return http.get<IMovieData>(`/genre/movie/list`);
};

const MovieService = {
  getAll,
  get,
  getGenres,
  search,
  getMovie,
  getSimilarMovies,
};

export default MovieService;
