import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router';
import Appbar from 'components/Appbar';
import Container from 'components/Container';
import SkrollToTop from 'components/SkrollToTop';
import Spinner from 'components/Spinner';
import './App.module.css';

const HomePage = lazy(() =>
  import('./views/HomePage' /* webpackChunkName: "HomePage" */),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage' /* webpackChunkName: "MoviesPage" */),
);
const NotFoundView = lazy(() =>
  import('./views/NotFoundView' /* webpackChunkName: "NotFoundPage" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './components/MovieDetailsPage/MovieDetailsPage'
    /* webpackChunkName: "MovieDetailsPage" */
  ),
);

export default function App() {
  return (
    <Container>
      <Appbar />
      <Suspense fallback={<Spinner />}>
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
      <SkrollToTop showBelow={250} />
    </Container>
  );
}
