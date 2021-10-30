/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import s from './HomePage.module.css';
import Button from 'components/Button';
import api from 'components/Service-api';

export default function HomePage() {
  const { url } = useRouteMatch();
  console.log(url);
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

  return (
    <>
      <div>
        <h1>Trending today</h1>
        <ul className={s.grid}>
          {movies &&
            movies.map(movie => (
              <li key={movie.id}>
                <Link to={`${url}movies/${movie.id}`}>
                  <img
                    className={s.image}
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.original_title}
                  />
                  <p>{movie.title || movie.name}</p>
                  <p>{movie.release_date}</p>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      {<Button onClick={buttonLoadMore} />}
    </>
  );
}
