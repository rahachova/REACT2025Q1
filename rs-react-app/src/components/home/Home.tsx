import { useEffect, useMemo } from 'react';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { Search } from '../search/Search';
import { Movies } from '../movies/Movies';
import { Pagination } from '../pagination/Pagination';
import { Outlet, useSearchParams } from 'react-router';
import { useSearchQuery } from '../../hooks/useSearchQuery';
import { useGetMoviesQuery } from '../../store/services/movies';
import { Spinner } from '../spinner/Spinner';

import './Home.css';
import { useTheme } from '../../context/theme/use-theme';

export function Home() {
  const { theme, toggleTheme } = useTheme();
  const [savedSearchQuery] = useSearchQuery();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageNumber = searchParams.get('page');
  const searchQuery = searchParams.get('query');

  const getMoviesArg = useMemo(() => {
    return pageNumber === null || searchQuery === null
      ? undefined
      : {
          searchQuery,
          pageNumber,
        };
  }, [pageNumber, searchQuery]);

  const { data, error, isFetching } = useGetMoviesQuery(
    getMoviesArg ?? skipToken
  );

  useEffect(() => {
    searchParams.set('page', pageNumber || '0');
    searchParams.set('query', searchQuery || savedSearchQuery);
    setSearchParams(searchParams);
  }, []);

  const moviesLayout = useMemo(() => {
    if (data) {
      const { movies } = data;
      return <Movies movies={movies} />;
    }
  }, [data]);

  const pagination = useMemo(() => {
    if (data) {
      const { firstPage, lastPage } = data.page;
      return <Pagination firstPage={firstPage} lastPage={lastPage} />;
    }
  }, [data]);

  return (
    <>
      <div className="controls">
        <Search />
        <button onClick={toggleTheme} className="theme-toggle">
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
      {error ? (
        <div className="fetch-error">
          <strong>Error: </strong>
          {error.toString()}
        </div>
      ) : (
        <>
          <div className="home-container">
            {isFetching ? <Spinner /> : moviesLayout}
            <Outlet></Outlet>
          </div>
          {pagination}
        </>
      )}
    </>
  );
}
