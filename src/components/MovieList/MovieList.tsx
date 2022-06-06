import { useEffect, useState } from "react";
import MovieService from "../../services/MovieService";
import { Filter } from "../../types/Filter";
import IMovieGenres from "../../types/Genres";
import IMovieData from "../../types/Movie";
import { applyFilters } from "../../utils/filtering";
import Filters from "../Filters/Filters";
import Movie from "../Movie/Movie";

export default function Movies() {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [movieData, setMovies] = useState<Array<IMovieData>>([]);
  const [searchData, setSearchData] = useState<Array<IMovieData>>([]);
  const [genres, setGenres] = useState<Array<IMovieGenres>>([]);

  useEffect(() => {
    retrieveMovies();
    retrieveGenres();
  }, []);

  const retrieveMovies = () => {
    MovieService.getAll()
      .then((response: any) => {
        setMovies(response.data.results);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const retrieveGenres = () => {
    MovieService.getGenres()
      .then((response: any) => {
        const { genres } = response.data;
        setGenres(genres);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  let shownMovies = applyFilters(movieData, filters);
  let shownMoviesSearch = applyFilters(searchData, filters);

  return (
    <div className="container mt-3">
      {genres && genres.length > 0 && (
        <>
          <Filters setMovies={setSearchData} filters={filters} setFilters={setFilters} amountTotal={movieData.length} amountVisible={shownMovies.length} genres={genres} />
          <div className="row mt-3">
            {searchData.length === 0 && shownMovies.map((movie) => <Movie key={movie.id} movie={movie} />)}
            {searchData.length > 0 && shownMoviesSearch.map((movie) => <Movie key={movie.id} movie={movie} />)}
          </div>
        </>
      )}
    </div>
  );
}
