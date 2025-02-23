import { describe, test, expect, afterAll, afterEach, beforeAll } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Home } from './Home';
import { renderWithProviders } from '../../utils/test-utils';
import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';

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

export const handlers = [
  http.post('https://stapi.co/api/v1/rest/movie/search', async () => {
    await delay(150);
    return HttpResponse.json({ movies: mockMovies, page: mockPagination });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('Home Component', () => {
  test('renders loading spinner', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('displays movies after search query', async () => {
    renderWithProviders(
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
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    const spinner = screen.getByTestId('spinner');

    expect(spinner).toBeInTheDocument();
  });

  test('renders pagination correctly with current page', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('1'));

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
