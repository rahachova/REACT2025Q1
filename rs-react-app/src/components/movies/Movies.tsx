import { ChangeEvent, useCallback, useMemo } from 'react';
import { IMovie } from '../../types/movie';
import { useSearchParams } from 'react-router';
import { Spinner } from '../spinner/Spinner';
import { select, remove } from '../../store/selected-movie-slice';
import { useDispatch, useSelector } from 'react-redux';
import './Movies.css';
import { RootState } from '../../store/store';

interface IProps {
  movies: IMovie[];
  isLoading: boolean;
}

export function Movies({ movies, isLoading }: IProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectedMovies } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const handleMovieActivate = useCallback(
    (uid: string) => {
      searchParams.set('details', uid);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const handleMovieSelect = useCallback(
    (movie: IMovie, isSelected: boolean) => {
      if (isSelected) {
        dispatch(select(movie));
      } else {
        dispatch(remove(movie.uid));
      }
    },
    [dispatch]
  );

  const isMovieSelected = useCallback(
    (uid: string) => {
      return selectedMovies.some((movie) => movie.uid === uid);
    },
    [selectedMovies]
  );

  const moviesTable = useMemo(() => {
    return movies.length ? (
      <table className="movies">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Release Date</th>
            <th>Main Director</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => {
            const { uid, title, usReleaseDate, mainDirector } = movie;

            return (
              <tr
                onClick={() => handleMovieActivate(uid)}
                key={uid}
                className="movie"
              >
                <td>
                  <input
                    type="checkbox"
                    checked={isMovieSelected(uid)}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      handleMovieSelect(movie, e.target.checked);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                </td>
                <td>{title}</td>
                <td>{usReleaseDate}</td>
                <td>{mainDirector.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    ) : (
      <div>No movies with such name</div>
    );
  }, [handleMovieActivate, handleMovieSelect, isMovieSelected, movies]);

  return (
    <div className="movies_container">
      {isLoading ? <Spinner /> : moviesTable}
    </div>
  );
}
