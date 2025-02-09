import { useCallback, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { MovieService } from '../../services/movie-service';
import { IMovie } from '../../types/movie';
import { Spinner } from '../spinner/Spinner';
import './MovieDetails.css';

const movieService = new MovieService();

export function MovieDetails() {
  const [movie, setMovie] = useState<IMovie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const movieId = searchParams.get('details');

  const handleGetMovie = useCallback(async (id: string) => {
    setIsLoading(true);
    const { movie } = await movieService.getMovie(id);
    setMovie(movie);
    setIsLoading(false);
  }, []);

  const handleDetailsClose = useCallback(() => {
    searchParams.set('details', '');
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (movieId) handleGetMovie(movieId);
  }, [handleGetMovie, movieId]);

  return (
    movieId && (
      <div className="movie-details">
        {isLoading ? (
          <Spinner />
        ) : (
          movie && (
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
          )
        )}
      </div>
    )
  );
}
