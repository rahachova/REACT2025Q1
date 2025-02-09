import { useCallback, useMemo } from 'react';
import { IMovie } from '../../types/movie';
import { useSearchParams } from 'react-router';
import './Movies.css';
import { Spinner } from '../spinner/Spinner';

interface IProps {
  movies: IMovie[];
  isLoading: boolean;
}

export function Movies({ movies, isLoading }: IProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleMovieSelect = useCallback(
    (uid: string) => {
      searchParams.set('details', uid);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const moviesTable = useMemo(() => {
    return movies.length ? (
      <table className="movies">
        <thead>
          <tr>
            <th>Title</th>
            <th>Release Date</th>
            <th>Main Director</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(({ uid, title, usReleaseDate, mainDirector }) => (
            <tr
              onClick={() => handleMovieSelect(uid)}
              key={uid}
              className="movie"
            >
              <td>{title}</td>
              <td>{usReleaseDate}</td>
              <td>{mainDirector.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <div>No movies with such name</div>
    );
  }, [handleMovieSelect, movies]);

  return (
    <div className="movies_container">
      {isLoading ? <Spinner /> : moviesTable}
    </div>
  );
}
