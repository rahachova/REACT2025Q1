import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Home } from './Home';
import { vi } from 'vitest';

const mockMovies = [
  {
    uid: '1',
    title: 'Movie 1',
    usReleaseDate: '2023-01-01',
    mainDirector: { name: 'Director 1' },
  },
  {
    uid: '2',
    title: 'Movie 2',
    usReleaseDate: '2023-02-01',
    mainDirector: { name: 'Director 2' },
  },
];

const mockPagination = { totalPages: 2, firstPage: false, lastPage: false };

vi.mock(import('../../services/movie-service'), () => {
  const MovieService = vi.fn();
  MovieService.prototype.getMovies = vi.fn(() =>
    Promise.resolve({ movies: mockMovies, page: mockPagination })
  );
  return { MovieService };
});

describe('Home Component', () => {
  test('displays movies after search query', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'test movie' },
    });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => screen.getByText('Movie 1'));

    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });

  test('shows a loading spinner while movies are loading', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    const spinner = screen.getByTestId('spinner');

    expect(spinner).toBeInTheDocument();
  });

  test('renders pagination correctly with current page', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('1'));

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
