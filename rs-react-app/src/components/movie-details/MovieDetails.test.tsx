import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { MovieDetails } from './MovieDetails';
import { vi } from 'vitest';

const mockMovie = {
  uid: '1',
  title: 'Test Movie',
  usReleaseDate: '2023-01-01',
  mainDirector: { name: 'Director 1' },
  writers: [
    { uid: 'w1', name: 'Writer 1' },
    { uid: 'w2', name: 'Writer 2' },
  ],
};

vi.mock(import('../../services/movie-service'), () => {
  const MovieService = vi.fn();
  MovieService.prototype.getMovie = vi.fn(() =>
    Promise.resolve({ movie: mockMovie })
  );
  return { MovieService };
});

describe('MovieDetails Component', () => {
  test('shows loading spinner while fetching movie data', () => {
    render(
      <MemoryRouter initialEntries={['/movie?details=1']}>
        <MovieDetails />
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('renders movie details when data is fetched', async () => {
    render(
      <MemoryRouter initialEntries={['/movie?details=1']}>
        <MovieDetails />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('Test Movie'));

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
    expect(screen.getByText('Director 1')).toBeInTheDocument();
    expect(screen.getByText('Writer 1')).toBeInTheDocument();
    expect(screen.getByText('Writer 2')).toBeInTheDocument();
  });

  test('renders loading spinner and then movie details after data fetch', async () => {
    render(
      <MemoryRouter initialEntries={['/movie?details=1']}>
        <MovieDetails />
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => screen.getByText('Test Movie'));

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });

  test('closes movie details when close button is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/movie?details=1']}>
        <MovieDetails />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('Test Movie'));

    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);

    expect(window.location.search).toBe('');
  });

  test('does not render movie details when no details param is in URL', () => {
    render(
      <MemoryRouter initialEntries={['/movie']}>
        <MovieDetails />
      </MemoryRouter>
    );

    expect(screen.queryByText('Test Movie')).not.toBeInTheDocument();
  });
});
