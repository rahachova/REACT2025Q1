import { useState, useCallback } from 'react';
import { Search } from './components/search/Search';
import { MovieService } from './services/movie-service';
import { IMovie } from './types/movie';
import { Movies } from './components/movies/Movies';
import './App.css';
import { Pagination } from './components/pagination/Pagination';
import { IPagination } from './types/pagination';
import { useSearchQuery } from './hooks/useSearchQuery';

const movieService = new MovieService();

export function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [fetchError, setFetchError] = useState<null | string>(null);
  const [page, setPage] = useState<IPagination>({
    pageNumber: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
  });

  const [query] = useSearchQuery();

  const { pageNumber, totalPages, firstPage, lastPage } = page;

  const handleMoviesSearch = useCallback(
    async ({
      searchQuery,
      nextPageNumber,
    }: {
      searchQuery?: string;
      nextPageNumber?: number;
    }) => {
      setFetchError(null);
      setIsLoading(true);

      try {
        const { movies, page } = await movieService.getMovies(
          searchQuery || query,
          nextPageNumber || pageNumber
        );
        setMovies(movies);
        setPage(page);
      } catch (error) {
        setFetchError(
          error instanceof Error ? error.message : 'Unexpected error'
        );
      } finally {
        setIsLoading(false);
      }
    },
    [pageNumber, query]
  );

  const handlePageChange = useCallback((nextPageNumber: number) => {
    handleMoviesSearch({ nextPageNumber });
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
        <>
          <Movies movies={movies} isLoading={isLoading} />
          <Pagination
            currentPage={pageNumber}
            totalPages={totalPages}
            firstPage={firstPage}
            lastPage={lastPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}
