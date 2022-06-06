import IMovieData from "../../types/Movie";
import { useNavigate } from "react-router-dom";
import { Rating } from "semantic-ui-react";
import "./movie.scss";

type MovieProps = {
  movie: IMovieData;
};

export default function Movie({ movie }: MovieProps) {
  let navigate = useNavigate();

  const navigateDetail = (id: number) => {
    navigate(`/movies/${id.toString()}`);
  };
  return (
    <div className="col-md-3" style={{ paddingBottom: "1rem" }} key={movie.title} onClick={() => navigateDetail(movie.id)}>
      <div className="card">
        <img className="card-img-top img-fluid" src={movie.poster_path ? `https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}` : "http://via.placeholder.com/360x540"} alt={movie.title} />

        <div className="card-body">
          <span className="card-title" style={{ display: "flex" }}>
            {movie.title}
            <Rating className="ratings" icon="star" defaultRating={movie.vote_average / 2} maxRating={5} />
          </span>
          <span>{movie.release_date}</span>
        </div>
      </div>
    </div>
  );
}
