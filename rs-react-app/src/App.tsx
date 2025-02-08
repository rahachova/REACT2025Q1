import { useState, useCallback } from 'react';
import { Search } from './components/search/Search';
import { MovieService } from './services/movie-service';
import { IMovie } from './types/movie';
import { Movies } from './components/movies/Movies';
import './App.css';

const movieService = new MovieService();

export function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [fetchError, setFetchError] = useState<null | string>(null);

  const handleMoviesSearch = useCallback(async (searchQuery: string) => {
    setFetchError(null);
    setIsLoading(true);

    try {
      const movies = await movieService.getMovies(searchQuery);
      setMovies(movies);
    } catch (error) {
      setFetchError(
        error instanceof Error ? error.message : 'Unexpected error'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <Search onSearch={handleMoviesSearch} />
      {fetchError ? (
        <div className="fetch-error">
          <strong>Error: </strong>
          {fetchError}
        </div>
      ) : (
        <Movies movies={movies} isLoading={isLoading} />
      )}
    </>
  );
}
