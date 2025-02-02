import { Component } from 'react';
import { Search } from './components/search/Search';
import { MovieService } from './services/movie-service';
import { IMovie } from './types/movie';
import { Movies } from './components/movies/Movies';
import './App.css';

interface IState {
  isLoading: boolean;
  hasError: boolean;
  movies: IMovie[];
  fetchError: string | null;
}

class App extends Component {
  state: IState = {
    isLoading: false,
    hasError: false,
    movies: [],
    fetchError: null,
  };

  movieService = new MovieService();

  throwError = () => {
    this.setState(({ hasError }: IState) => ({
      hasError: !hasError,
    }));
  };

  handleMoviesSearch = async (search: string) => {
    this.setState({
      isLoading: true,
    });

    try {
      const movies = await this.movieService.getMovies(search);
      this.setState({
        movies: movies,
        isLoading: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({
          fetchError: error.message,
          isLoading: false,
        });
      } else {
        this.setState({
          fetchError: 'Unexpected error',
          isLoading: false,
        });
      }
    }
  };

  render() {
    const { hasError, movies, isLoading } = this.state;

    if (hasError) {
      throw Error('Error!');
    }

    return (
      <>
        <Search onSearch={this.handleMoviesSearch}></Search>
        <Movies movies={movies} isLoading={isLoading} />
        <button className="error-button" onClick={this.throwError}>
          Throw error
        </button>
      </>
    );
  }
}

export default App;
