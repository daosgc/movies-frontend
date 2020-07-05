import React, { useReducer, useEffect } from 'react';
import './App.css';
import SearchComponent from './components/search';
import MovieComponent from './components/movie';
import { initialState, reducer } from "./store/reducer";

const apiKey = '4c16fd893b9ba73cf0d84ceb8273cb58';
const apiDiscover = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { movies, errorMessage, loading } = state;

  const search = queryText => {
    dispatch({
      type: "LOADING_MOVIES"
    });

    const apiSearch = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${queryText}`;
    const apirUrl = queryText ? apiSearch : apiDiscover;
    console.log('queryText', queryText);
    fetch(apirUrl)
    .then(response => response.json())
    .then(response => {
      dispatch({
        type: "MOVIES_SUCCESS",
        payload: response.results
      });
    })
    .catch(err => {
      dispatch({
        type: "MOVIES_FAILURE",
        payload: err
      });
    });
  };

  useEffect(() => {
    dispatch({
      type: "LOADING_MOVIES"
    });

    fetch(apiDiscover)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: "MOVIES_SUCCESS",
          payload: response.results
        });
      })
      .catch(err => {
        dispatch({
          type: "MOVIES_FAILURE",
          payload: err
        });
      });

  }, []);


  const retrievedMovies =
    loading && !errorMessage ? (
      <div className="loading">Cargando..</div>
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      movies.map((movie, index) => (
        <MovieComponent key={`${index}-${movie.Title}`} movie={movie} />
      ))
    );

  return (
    <div className="App">
      <SearchComponent search={search} />
      <div className="movies">{retrievedMovies}</div>
    </div>
  );
}

export default App;
