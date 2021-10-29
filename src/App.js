import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.module.css';

import Appbar from 'components/Appbar';
import api from 'components/Service-api';
import Container from 'components/Container';
import SearchForm from 'components/SearchForm';
import Spinner from 'components/Spinner';
import HomePage from 'views/HomePage';
import NotFoundView from 'views/NotFoundView';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(Status.IDLE);

  // api.fetchHomePage().then(r => console.log(r));
  // api.fetchMovieDetails().then(r => console.log(r));
  // api.fetchMovieCredits().then(r => console.log(r));
  // api.fetchMovieReviews().then(r => console.log(r));

  useEffect(() => {
    if (!query) {
      return;
    }
    setStatus(Status.PENDING);
    api.fetchSearch(query);
    setStatus(Status.RESOLVED);
  }, [query]);

  const handleFormSubmit = query => {
    setQuery(query);
  };

  return (
    <Container>
      <Appbar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/movies">
          <SearchForm onSubmit={handleFormSubmit} />
          {status === Status.PENDING && <Spinner />}
          <ToastContainer autoClose={2000} />
        </Route>
        <Route>
          <NotFoundView />
        </Route>
      </Switch>
    </Container>
  );
}
