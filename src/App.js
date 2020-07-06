import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Home, MovieDetails } from './screens';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/movie/:id" >
          <MovieDetails />
        </Route>
      </Switch>
    </Router>
  );
}
