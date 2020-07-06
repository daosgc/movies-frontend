import React from "react";
import './Movie.scss';

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://cinemaone.net/images/movie_placeholder.png";

const MovieComponent = ({ movie }) => {
  const poster =
    movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : DEFAULT_PLACEHOLDER_IMAGE;
  return (
    <div className="movie-card">
      <img className="poster" src={poster} alt={`movie_${movie.original_title}`}/>
      <div className="footer">
        {movie.original_title}
      </div>
    </div>
  );
};

export default MovieComponent;
