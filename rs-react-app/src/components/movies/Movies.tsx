import { Component, ReactNode } from 'react';
import { IMovie } from '../../types/movie';
import './Movies.css';

interface IProps {
  movies: IMovie[];
  isLoading: boolean;
}

export class Movies extends Component<IProps> {
  render(): ReactNode {
    return (
      <table className="movies">
        <thead>
          <tr>
            <th>Title</th>
            <th>Release Date</th>
            <th>Main Director</th>
          </tr>
        </thead>
        <tbody>
          {this.props.movies.map(
            ({ uid, title, usReleaseDate, mainDirector }) => (
              <tr key={uid} className="movie">
                <td>{title}</td>
                <td>{usReleaseDate}</td>
                <td>{mainDirector.name}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    );
  }
}
