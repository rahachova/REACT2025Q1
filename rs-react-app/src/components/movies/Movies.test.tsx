import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Movies } from './Movies';
import { vi } from 'vitest';
import { IMovie } from '../../types/movie';

const mockSetSearchParams = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useSearchParams: () => {
      const params = new URLSearchParams();
      return [params, mockSetSearchParams];
    },
  };
});

describe('Movies Component', () => {
  test('renders loading spinner when isLoading is true', () => {
    render(
      <MemoryRouter>
        <Movies movies={[]} isLoading={true} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('renders movie table when there are movies', () => {
    const mockMovies: IMovie[] = [
      {
        uid: '1',
        title: 'Movie 1',
        usReleaseDate: '2023-01-01',
        mainDirector: { name: 'Director 1', uid: 'ID1' },
        writers: [{ name: 'Writer 1', uid: 'ID1' }],
      },
      {
        uid: '2',
        title: 'Movie 2',
        usReleaseDate: '2023-02-01',
        mainDirector: { name: 'Director 2', uid: 'ID1' },
        writers: [{ name: 'Writer 2', uid: 'ID2' }],
      },
    ];

    render(
      <MemoryRouter>
        <Movies movies={mockMovies} isLoading={false} />
      </MemoryRouter>
    );

    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });

  test("displays 'No movies with such name' when movies array is empty", () => {
    render(
      <MemoryRouter>
        <Movies movies={[]} isLoading={false} />
      </MemoryRouter>
    );

    expect(screen.getByText('No movies with such name')).toBeInTheDocument();
  });

  test('updates searchParams when a movie is selected', () => {
    const mockMovies = [
      {
        uid: '1',
        title: 'Movie 1',
        usReleaseDate: '2023-01-01',
        mainDirector: { name: 'Director 2', uid: 'ID1' },
        writers: [{ name: 'Writer 2', uid: 'ID2' }],
      },
    ];

    render(
      <MemoryRouter>
        <Movies movies={mockMovies} isLoading={false} />
      </MemoryRouter>
    );

    const movieRow = screen.getByText('Movie 1');
    fireEvent.click(movieRow);

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams({ details: '1' })
    );
  });
});
