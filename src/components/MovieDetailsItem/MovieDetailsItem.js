import s from './MovieDetailsItem.module.css';
export default function MovieDetailsItem({ movie, onGoBack }) {
  return (
    <>
      <button className={s.button} type="button" onClick={onGoBack}>
        Back
      </button>
      <div className={s.movieDetail}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
          className={s.image}
        />
        <div className={s.detailItem}>
          <h2 className={s.title}>{movie.title || movie.name}</h2>
          <h3 className={s.title}>{movie.release_date}</h3>
          <p>User Score {movie.vote_average * 10}%</p>
          <p className={s.title}>Overview</p>
          <p className={s.text}>{movie.overview}</p>
          <p className={s.title}>Genres</p>
          <p className={s.text}>{movie.genres.map(e => e.name).join(' ')}</p>
        </div>
      </div>
    </>
  );
}
