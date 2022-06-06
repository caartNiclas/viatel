import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Rating, Button } from "semantic-ui-react";
import MovieService from "../../services/MovieService";
import IMovieData from "../../types/Movie";
import Movie from "../Movie/Movie";
import "./movie.scss";

const MovieDetail: React.FC = () => {
  const { id } = useParams();
  const [movie, setCurrentMovie] = useState<IMovieData>();
  const [relatedMovies, setRelatedMovies] = useState<Array<IMovieData>>([]);
  let navigate = useNavigate();

  const getMovie = (id: string) => {
    MovieService.getMovie(parseInt(id))
      .then((response: any) => {
        setCurrentMovie(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const getRelatedMovies = (id: string) => {
    MovieService.getSimilarMovies(parseInt(id))
      .then((response: any) => {
        setRelatedMovies(response.data.results);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) {
      getMovie(id);
      getRelatedMovies(id);
    }
  }, [id]);

  return (
    <>
      {movie && (
        <>
          <div className="poster" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h600_multi_faces${movie.backdrop_path})` }}>
            <div className="background">
              <Button icon="arrow-left" content="GO BACK" primary className="m-3" onClick={() => navigate(-1)} />
            </div>

            <div className="container pt-3">
              <div className="movie-overview">
                <div className="col-md-3 m-4">
                  <img src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt={movie.title}></img>
                </div>
                <div className="col-md-6 p-4">
                  <h1 className="mb-3">
                    {movie.title} ({movie.release_date.slice(0, 4)})
                  </h1>
                  <span className="tagline">{movie.tagline}</span>
                  <p className="mb-3 mt-3">{movie.overview}</p>
                  <Rating className="mb-3" icon="star" defaultRating={movie.vote_average / 2} maxRating={5} />
                  <br />
                  {movie &&
                    movie.genres &&
                    movie.genres.map((genre) => {
                      return (
                        <span key={genre.id} className="genre mr-1">
                          {genre.name}
                        </span>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="container mt-3">
            <h1>Related Movies</h1>
            <div className="row">{relatedMovies && relatedMovies.map((movie) => <Movie key={movie.id} movie={movie} />)}</div>
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetail;
