/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchForm from 'components/SearchForm';
import Spinner from 'components/Spinner';
import MovieItem from 'components/MovieItem';
import Button from 'components/Button';
import api from 'components/Service-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MoviesPage() {
  const { url } = useRouteMatch();
  console.log(url);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!query) {
      return;
    }
    setStatus(Status.PENDING);
    api
      .fetchSearch(query, page)
      .then(res => res.results)
      .then(res => {
        setMovies([...movies, ...res]);
        if (page !== 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
        setStatus(Status.RESOLVED);
      });
  }, [query, page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setMovies([]);
  };
  const buttonLoadMore = () => {
    setPage(page + 1);
  };
  return (
    <>
      <SearchForm onSubmit={handleFormSubmit} />
      <MovieItem movies={movies} url={url} />
      {movies.length > 0 && <Button onClick={buttonLoadMore} />}
      <ToastContainer autoClose={2000} />
      {status === Status.PENDING && <Spinner />}
    </>
  );
}
