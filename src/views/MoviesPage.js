/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useHistory, useLocation } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';

import SearchForm from 'components/SearchForm';
import Spinner from 'components/Spinner';
import MovieItem from 'components/MovieItem';
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
  const query = new URLSearchParams(search).get('query');

  const [searchQuery, setSearchQuery] = useState(query || '');
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [lastElement, setLastElement] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setStatus(Status.PENDING);
    api
      .fetchSearch(searchQuery, page)
      .then(res => {
        if (res.total_pages === 0) {
          toast.dark(
            `Sorry, there are no movies ${searchQuery} title. Please try again`,
          );
          setStatus(Status.RESOLVED);
        }
        return res.results;
      })
      .then(res => {
        setMovies([...movies, ...res]);
        setStatus(Status.RESOLVED);
      });
  }, [searchQuery, page]);

  const observer = useRef(
    new IntersectionObserver(entries => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPage(no => no + 1);
      }
    }),
  );
  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setPage(1);
    setMovies([]);
    history.push({ ...location, search: `query=${query}` });
  };

  return (
    <>
      <SearchForm onSubmit={handleFormSubmit}></SearchForm>
      <MovieItem
        movies={movies}
        location={location}
        setLastElement={setLastElement}
      />
      <ToastContainer
        autoClose={2000}
        closeOnClick={true}
        position="top-center"
      />
      {status === Status.PENDING && <Spinner />}
    </>
  );
}
