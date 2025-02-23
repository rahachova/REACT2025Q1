import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { Spinner } from '../spinner/Spinner';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useGetMovieQuery } from '../../store/services/movies';
import './MovieDetails.css';

export function MovieDetails() {
  const [searchParams, setSearchParams] = useSearchParams();

  const movieId = searchParams.get('details');

  const { data, isFetching } = useGetMovieQuery(movieId ?? skipToken);

  const handleDetailsClose = useCallback(() => {
    searchParams.set('details', '');
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const movieLayout = useMemo(() => {
    if (data) {
      const { movie } = data;

      return (
        <div>
          <h2 className="movie-details_heading">
            {movie.title}
            <button onClick={handleDetailsClose}>X</button>
          </h2>
          <p>
            <strong>Release Date:</strong> {movie.usReleaseDate}
          </p>
          <p>
            <strong>Director:</strong> {movie.mainDirector.name}
          </p>
          <strong>Writers:</strong>
          <ul>
            {movie.writers.map(({ uid, name }) => (
              <li key={uid}>{name}</li>
            ))}
          </ul>
        </div>
      );
    }
  }, [data, handleDetailsClose]);

  return (
    movieId && (
      <div className="movie-details">
        {isFetching ? <Spinner /> : movieLayout}
      </div>
    )
  );
}
