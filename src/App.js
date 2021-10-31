import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router';
import Appbar from 'components/Appbar';
import Container from 'components/Container';
import './App.module.css';

const HomePage = lazy(() =>
  import('./views/HomePage'),
); /* webpackChunkName: "HomePage" */
const MoviesPage = lazy(() =>
  import('./views/MoviesPage'),
); /* webpackChunkName: "MoviesPage" */
const NotFoundView = lazy(() =>
  import('./views/NotFoundView'),
); /* webpackChunkName: "NotFoundPage" */

const MovieDetailsPage = lazy(() =>
  import('./components/MovieDetailsPage/MovieDetailsPage'),
);

export default function App() {
  return (
    <Container>
      <Appbar />
      <Suspense fallback="Loading...">
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
      </Suspense>
    </Container>
  );
}
