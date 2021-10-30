import s from './MovieItem.module.css';
import { Link } from 'react-router-dom';

export default function MovieItem({ movies, url }) {
  return (
    <>
      <ul className={s.grid}>
        {movies &&
          movies.map(movie => (
            <li key={movie.id}>
              <Link to={`${url}/${movie.id}`}>
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
    </>
  );
}
