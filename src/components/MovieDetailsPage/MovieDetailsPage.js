import { useState, useEffect } from 'react';
import { lazy, Suspense } from 'react';
import { useParams } from 'react-router';
import {
  NavLink,
  useRouteMatch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import api from 'components/Service-api/service-api';
import MovieDetailsItem from 'components/MovieDetailsItem';
import s from './MovieDetailsPage.module.css';

const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));

export default function MovieDetailsPage() {
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState();
  // const [page, setPage] = useState(1);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    api.fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {movie && <MovieDetailsItem movie={movie} onGoBack={onGoBack} />}
      {
        <div className={s.list}>
          <p className={s.title}>Additional infomation</p>
          <ul>
            <NavLink
              to={{ pathname: `${url}/cast`, state: { ...location.state } }}
              className={s.item}
            >
              Cast
            </NavLink>
            <NavLink
              to={{ pathname: `${url}/reviews`, state: { ...location.state } }}
              className={s.item}
            >
              Reviews
            </NavLink>
          </ul>
        </div>
      }
      <Suspense fallback="Loading...">
        <Route path={`${path}/cast`}>
          <Cast />
        </Route>

        <Route path={`${path}/reviews`}>
          <Reviews />
        </Route>
      </Suspense>
    </>
  );
}
