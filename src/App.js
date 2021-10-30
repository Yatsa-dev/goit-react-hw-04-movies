import { Switch, Route } from 'react-router';
import './App.module.css';

import Appbar from 'components/Appbar';
import Container from 'components/Container';

import HomePage from 'views/HomePage';
import NotFoundView from 'views/NotFoundView';
import MoviesPage from 'views/MoviesPage';
import MovieDetailsPage from 'components/MovieDetailsPage';

export default function App() {
  return (
    <Container>
      <Appbar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/movies" exact>
          <MoviesPage />
        </Route>
        <Route path="/movies/:movieId">
          <MovieDetailsPage />
        </Route>
        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </Container>
  );
}
