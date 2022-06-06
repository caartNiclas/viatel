import IMovieData from "../types/Movie";
import { Group } from "../types/enums";
import { Filter } from "../types/Filter";

function isShownByGenre(movie: IMovieData, filters: Filter[]) {
  const genreFilters = filters.filter((filter) => filter.group === Group.GENRE);
  if (!genreFilters.length) return true;
  return genreFilters.every((filter) => filter.fnc(movie));
}

export function applyFilters(movies: IMovieData[], filters: Filter[]) {
  return movies.filter((movie) => {
    const showByGenre = isShownByGenre(movie, filters);
    return showByGenre;
  });
}
