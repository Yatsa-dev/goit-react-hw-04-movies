/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
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
  const history = useHistory();
  const location = useLocation();
  const { search } = location;
  const { query } = queryString.parse(search);

  const [searchQuery, setSearchQuery] = useState(query || '');
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setStatus(Status.PENDING);
    setTimeout(() => {
      api
        .fetchSearch(searchQuery, page)
        .then(res => {
          if (res.total_pages === 0) {
            toast.dark(
              `Sorry, there are no movies ${searchQuery} name. Please try again`,
            );
            setStatus(Status.RESOLVED);
          }

          return res.results;
        })
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
    }, 5000);
  }, [searchQuery, page]);

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setPage(1);
    setMovies([]);
    history.push({ ...location, search: `query=${query}` });
  };
  const buttonLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      <SearchForm onSubmit={handleFormSubmit}></SearchForm>
      <MovieItem movies={movies} location={location} />
      {movies.length > 0 && <Button onClick={buttonLoadMore} />}
      <ToastContainer
        autoClose={2000}
        closeOnClick={true}
        position="top-center"
      />
      {status === Status.PENDING && <Spinner />}
    </>
  );
}
