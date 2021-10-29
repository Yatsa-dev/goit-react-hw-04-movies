import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import s from './HomePage.module.css';
import api from 'components/Service-api';

export default function HomePage() {
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    api
      .fetchHomePage()
      .then(res => res.results)
      .then(setMovies);
  }, []);

  return (
    <>
      <div>
        <h1>Trending today</h1>
        <ul className={s.grid}>
          {movies &&
            movies.map(movie => (
              <li key={movie.id}>
                <NavLink to={`/movies/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.original_title}
                  />
                  <p>{movie.title || movie.name}</p>
                  <p>{movie.release_date}</p>
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
