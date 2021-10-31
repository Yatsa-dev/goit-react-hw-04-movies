/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import api from 'components/Service-api/service-api';
import s from './Cast.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    api
      .fetchMovieCredits(movieId)
      .then(res => res.cast)
      .then(setCast);
  }, [movieId]);

  return (
    <>
      <ul className={s.grid}>
        {cast &&
          cast.map(res => (
            <li key={res.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${res.profile_path}`}
                alt={res.name}
              />
              <p>{res.original_name}</p>
              <p>Character: {res.character}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
