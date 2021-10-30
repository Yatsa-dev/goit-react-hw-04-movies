import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link, useRouteMatch } from 'react-router-dom';
import api from 'components/Service-api/service-api';
import MovieDetailsItem from 'components/MovieDetailsItem';
import s from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    api.fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      {movie && <MovieDetailsItem movie={movie} />}
      {
        <div className={s.list}>
          <p className={s.title}>Additional infomation</p>
          <ul>
            <Link to={`${url}/cast`} className={s.item}>
              Cast
            </Link>
            <Link to={`${url}/reviews`} className={s.item}>
              Reviews
            </Link>
          </ul>
        </div>
      }
    </>
  );
}
