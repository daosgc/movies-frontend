import React from 'react';
import {
  useParams
} from "react-router-dom";

function MovieDetails() {
  let { id } = useParams();

  return (
    <div className="movi-details-container">
      It is working {id}
    </div>
  );
}

export default MovieDetails;
