import { Component, ReactNode } from 'react';
import { IMovie } from '../../types/movie';
import './Movies.css';

interface IProps {
  movies: IMovie[];
  isLoading: boolean;
}

export class Movies extends Component<IProps> {
  render(): ReactNode {
    const { movies, isLoading } = this.props;

    return (
      <div className="movies_container">
        {isLoading ? (
          <div className="movies_spinner-container">
            <div className="movies_spinner"></div>
          </div>
        ) : movies.length ? (
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
        )}
      </div>
    );
  }
}
