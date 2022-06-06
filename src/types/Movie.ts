export default interface IMovieData {
  id: any;
  title: string;
  overview: string;
  poster_path?: string;
  genre_ids: Array<any>;
  vote_average: number;
  release_date: string;
  backdrop_path?: string;
  tagline: string;
  genres?: Array<any>;
}
