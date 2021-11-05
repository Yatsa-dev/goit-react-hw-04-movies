/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react';
// import Button from 'components/Button';
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
        // if (page !== 1) {
        //   window.scrollTo({
        //     top: document.documentElement.scrollHeight + 10,
        //     behavior: 'smooth',
        //   });
        // }
      });
  }, [page, ref]);

  const observer = new IntersectionObserver(
    ([entry]) => {
      // console.log(entry);

      if (entry.isIntersecting) {
        setPage(page + 1);
      }
    },
    {
      root: null,
      rootMargin: '200px',
      threshold: 0.5,
    },
  );
  if (ref.current) {
    observer.observe(ref.current);
  }

  // const buttonLoadMore = () => {
  //   setPage(page + 1);
  // };

  return (
    <>
      <div>
        <h1>Trending today</h1>
        <MovieItem movies={movies} />
      </div>

      <div ref={ref} id="sentinel">
        {/* {<Button onClick={buttonLoadMore} />} */}
        фффффффффффффф
      </div>
    </>
  );
}
