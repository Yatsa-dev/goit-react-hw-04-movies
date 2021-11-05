/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
import Button from 'components/Button';
import api from 'components/Service-api';
import MovieItem from 'components/MovieItem';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const ref = useRef();
  useEffect(() => {
    api
      .fetchHomePage(page)
      .then(res => res.results)
      .then(res => {
        setMovies([...movies, ...res]);
        if (page !== 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight + 10,
            behavior: 'smooth',
          });
        }
      });
  }, [page, ref]);
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      console.log(ref);
    }
  });
  if (ref.current) {
    observer.observe(ref.current);

    // setPage(page + 1);
    //  observer.disconnect(ref.current);
  }
  const buttonLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div>
        <h1>Trending today</h1>
        <MovieItem movies={movies} />
      </div>
      {<Button onClick={buttonLoadMore} />}
      <div ref={ref} id="sentinel"></div>
    </>
  );
}
