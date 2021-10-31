import s from './MovieItem.module.css';
import { NavLink } from 'react-router-dom';

export default function MovieItem({ movies, location }) {
  return (
    <>
      <ul className={s.grid}>
        {movies &&
          movies.map(movie => (
            <li key={movie.id}>
              <NavLink
                to={{
                  pathname: `/movies/${movie.id}`,
                  state: { from: location },
                }}
              >
                <img
                  className={s.image}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.original_title}
                />
                <p>{movie.title || movie.name}</p>
                <p>{movie.release_date}</p>
              </NavLink>
            </li>
          ))}
      </ul>
    </>
  );
}
