import { useState, useCallback, useEffect } from 'react';
import { Search } from '../search/Search';
import { MovieService } from '../../services/movie-service';
import { IMovie } from '../../types/movie';
import { Movies } from '../movies/Movies';
import { Pagination } from '../pagination/Pagination';
import { IPagination } from '../../types/pagination';
import { Outlet, useSearchParams } from 'react-router';
import { useSearchQuery } from '../../hooks/useSearchQuery';
import './Home.css';

const movieService = new MovieService();

export function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [fetchError, setFetchError] = useState<null | string>(null);
  const [page, setPage] = useState<IPagination>({
    totalPages: 0,
    firstPage: true,
    lastPage: true,
  });
  const [savedSearchQuery] = useSearchQuery();
  const [searchParams, setSearchParams] = useSearchParams();

  const { firstPage, lastPage } = page;

  const handleMoviesSearch = useCallback(
    async (query: string, pageNumber: number) => {
      setFetchError(null);
      setIsLoading(true);

      try {
        const { movies, page } = await movieService.getMovies(
          query,
          pageNumber
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
    []
  );

  const pageNumber = searchParams.get('page');
  const searchQuery = searchParams.get('query');

  useEffect(() => {
    if (searchQuery !== null && pageNumber !== null) {
      handleMoviesSearch(searchQuery, Number(pageNumber));
    }
  }, [handleMoviesSearch, pageNumber, searchQuery]);

  useEffect(() => {
    setSearchParams({
      page: pageNumber || '0',
      query: searchQuery || savedSearchQuery,
    });
  }, []);

  return (
    <>
      <Search />
      {fetchError ? (
        <div className="fetch-error">
          <strong>Error: </strong>
          {fetchError}
        </div>
      ) : (
        <>
          <div className="home-container">
            <Movies movies={movies} isLoading={isLoading} />
            <Outlet></Outlet>
          </div>
          <Pagination firstPage={firstPage} lastPage={lastPage} />
        </>
      )}
    </>
  );
}
