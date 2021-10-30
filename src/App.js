import { Switch, Route } from 'react-router';
import './App.module.css';

import Appbar from 'components/Appbar';
import Container from 'components/Container';

import HomePage from 'views/Home/HomePage';
import NotFoundView from 'views/NotFoundView';
import MoviesPage from 'views/Movie/MoviesPage';

export default function App() {
  // api.fetchHomePage().then(r => console.log(r));
  // api.fetchMovieDetails().then(r => console.log(r));
  // api.fetchMovieCredits().then(r => console.log(r));
  // api.fetchMovieReviews().then(r => console.log(r));

  return (
    <Container>
      <Appbar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/movies">
          <MoviesPage />
        </Route>
        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </Container>
  );
}
