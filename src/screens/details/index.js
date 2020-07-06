import React, { useState, useEffect } from 'react';
import {
  useParams
} from "react-router-dom";
import './Details.scss';

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://cinemaone.net/images/movie_placeholder.png";
const apiKey = '4c16fd893b9ba73cf0d84ceb8273cb58';

function MovieDetails() {
  let { id } = useParams();

  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const apiMovie = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
    fetch(apiMovie)
      .then(response => response.json())
      .then(response => {
        setLoading(false);
        setMovie(response);
      })
      .catch(err => {
        setErrorMessage(err);
      });
  }, [id]);

  const poster =
    movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : DEFAULT_PLACEHOLDER_IMAGE;

  const retrievedMovie =
    loading && !errorMessage ? (
      <div className="loading">Cargando..</div>
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      <div className="movie-details">
        <img className="poster" src={poster} alt={`movie_${movie.original_title}`}/>
        <div className="info">
          <div className="title">{movie.original_title}</div>
          <div className="row">
            <span>Overview</span>
            <div className="content">{movie.overview}</div>
          </div>
          <div className="row">
            <span>Vote Average</span>
            <div>{movie.vote_average}</div>
          </div>
        </div>
      </div>
    );


  return (
    <div className="movie-container">
      {retrievedMovie}
    </div>
  );
}

export default MovieDetails;
