import { describe, test, expect } from 'vitest';
import { selectedMoviesReducer, select, remove } from './selected-movie-slice';
import { IMovie } from '../types/movie';

describe('selectedMoviesSlice', () => {
  const initialState: IMovie[] = [];

  test('should return the initial state when no action is passed', () => {
    expect(selectedMoviesReducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  test('should handle select action and add movie to the state', () => {
    const newMovie: IMovie = {
      uid: '1',
      title: 'Test Movie',
      usReleaseDate: '2023-01-01',
      mainDirector: { uid: 'director-1', name: 'Director 1' },
      writers: [
        { uid: 'writer-1', name: 'Writer 1' },
        { uid: 'writer-2', name: 'Writer 2' },
      ],
    };

    const result = selectedMoviesReducer(initialState, select(newMovie));

    expect(result).toEqual([newMovie]);
  });

  test('should handle remove action and remove movie from the state', () => {
    const initialMovies: IMovie[] = [
      {
        uid: '1',
        title: 'Test Movie 1',
        usReleaseDate: '2023-01-01',
        mainDirector: { uid: 'director-1', name: 'Director 1' },
        writers: [
          { uid: 'writer-1', name: 'Writer 1' },
          { uid: 'writer-2', name: 'Writer 2' },
        ],
      },
      {
        uid: '2',
        title: 'Test Movie 2',
        usReleaseDate: '2023-02-01',
        mainDirector: { uid: 'director-2', name: 'Director 2' },
        writers: [
          { uid: 'writer-3', name: 'Writer 3' },
          { uid: 'writer-4', name: 'Writer 4' },
        ],
      },
    ];

    const result = selectedMoviesReducer(initialMovies, remove('1'));

    expect(result).toEqual([
      {
        uid: '2',
        title: 'Test Movie 2',
        usReleaseDate: '2023-02-01',
        mainDirector: { uid: 'director-2', name: 'Director 2' },
        writers: [
          { uid: 'writer-3', name: 'Writer 3' },
          { uid: 'writer-4', name: 'Writer 4' },
        ],
      },
    ]);
  });

  test('should not modify state if remove action is passed with non-existing uid', () => {
    const initialMovies: IMovie[] = [
      {
        uid: '1',
        title: 'Test Movie 1',
        usReleaseDate: '2023-01-01',
        mainDirector: { uid: 'director-1', name: 'Director 1' },
        writers: [
          { uid: 'writer-1', name: 'Writer 1' },
          { uid: 'writer-2', name: 'Writer 2' },
        ],
      },
    ];

    const result = selectedMoviesReducer(
      initialMovies,
      remove('non-existing-uid')
    );

    expect(result).toEqual(initialMovies);
  });
});
