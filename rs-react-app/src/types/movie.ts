import { IPagination } from './pagination';

export interface IMovie {
  uid: string;
  title: string;
  usReleaseDate: string;
  mainDirector: {
    uid: string;
    name: string;
  };
  writers: IWriter[];
}

interface IWriter {
  uid: string;
  name: string;
}

export interface IGetMoviesResult {
  movies: IMovie[];
  page: IPagination;
}

export interface IGetMoviesArg {
  searchQuery: string;
  pageNumber: string;
}

export interface IGetMovieResult {
  movie: IMovie;
}
