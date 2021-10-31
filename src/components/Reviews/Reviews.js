import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import api from 'components/Service-api/service-api';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api
      .fetchMovieReviews(movieId)
      .then(res => res.results)
      .then(setReviews);
  }, [movieId]);

  return (
    <>
      <ul>
        {reviews &&
          reviews.map(res => (
            <li key={res.id}>
              <p>{res.author}</p>
              <p>{res.content}</p>
            </li>
          ))}
      </ul>

      {reviews.length === 0 && <p>There is no reviews</p>}
    </>
  );
}
