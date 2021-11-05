/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import api from 'components/Service-api';
import MovieItem from 'components/MovieItem';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [lastElement, setLastElement] = useState(null);

  const observer = useRef(
    new IntersectionObserver(entries => {
      const first = entries[0];
      if (first.isIntersecting) {
        setPage(page + 1);
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

  useEffect(() => {
    api
      .fetchHomePage(page)
      .then(res => res.results)
      .then(res => {
        setMovies([...movies, ...res]);
        if (page !== 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      });
  }, [page]);

  return (
    <>
      <div>
        <h1>Trending today</h1>
        <MovieItem movies={movies} setLastElement={setLastElement} />
      </div>
    </>
  );
}
