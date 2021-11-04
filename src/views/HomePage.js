/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Button from 'components/Button';
import api from 'components/Service-api';
import MovieItem from 'components/MovieItem';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
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

  const buttonLoadMore = () => {
    setPage(page + 1);
  };
  // const containerRef = useRef();
  // const sentielRef = useRef();

  // function scrollCallback(entries: IntersectionObserverEntry[]) {
  //   if (entries.isInteresting) {
  //     console.log(entries);
  //   }
  // }

  // useEffect(() => {
  //   const scroll = new IntersectionObserver(scrollCallback, {
  //     root: containerRef.current,
  //   });
  //   scroll.observe(sentielRef.current);
  //   return () => {
  //     scroll.disconnect();
  //   };
  // }, []);

  return (
    <>
      <div>
        <h1>Trending today</h1>
        <MovieItem movies={movies} />
      </div>
      {<Button onClick={buttonLoadMore} />}
    </>
  );
}
