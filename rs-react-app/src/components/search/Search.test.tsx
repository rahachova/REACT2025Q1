import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Search } from './Search';
import { vi } from 'vitest';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useSearchParams: () => {
      let params = new URLSearchParams();
      return [params, vi.fn((newParams) => (params = newParams))];
    },
  };
});

const setSearchQuery = vi.fn();

vi.mock('../../hooks/useSearchQuery', () => ({
  useSearchQuery: () => {
    return ['query', setSearchQuery];
  },
}));

describe('Search Component', () => {
  test('renders input and button', () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('updates input when typing', () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Star Wars' } });

    expect(input).toHaveValue('Star Wars');
  });

  test('saves search query to URL params on search', () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Matrix' } });
    fireEvent.click(button);

    expect(setSearchQuery).toHaveBeenCalled();
  });

  test('loads saved query from local storage', () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    expect(screen.getByRole('textbox')).toHaveValue('query');
  });
});
