import { useMemo } from 'react';
import { IMovie } from '../../types/movie';
import './Movies.css';

interface IProps {
  movies: IMovie[];
  isLoading: boolean;
}

export function Movies({ movies, isLoading }: IProps) {
  const spinner = useMemo(() => {
    return (
      <div className="movies_spinner-container">
        <div className="movies_spinner"></div>
      </div>
    );
  }, []);

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
            <tr key={uid} className="movie">
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
  }, [movies]);

  return (
    <div className="movies_container">{isLoading ? spinner : moviesTable}</div>
  );
}
