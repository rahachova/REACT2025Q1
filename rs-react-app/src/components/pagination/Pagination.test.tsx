import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Pagination } from './Pagination';
import { vi } from 'vitest';

const mockSetSearchParams = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useSearchParams: () => {
      const params = new URLSearchParams({ test: 'test' });
      return [params, mockSetSearchParams];
    },
  };
});

describe('Pagination Component', () => {
  test('renders previous and next buttons', () => {
    render(
      <MemoryRouter>
        <Pagination firstPage={false} lastPage={false} />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /prev/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  test('disables previous button on the first page', () => {
    render(
      <MemoryRouter>
        <Pagination firstPage={true} lastPage={false} />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /prev/i })).toBeDisabled();
  });

  test('disables next button on the last page', () => {
    render(
      <MemoryRouter>
        <Pagination firstPage={false} lastPage={true} />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });

  test('updates page number in URL params on next click', () => {
    render(
      <MemoryRouter>
        <Pagination firstPage={false} lastPage={false} />
      </MemoryRouter>
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);

    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  test('updates page number in URL params on previous click', () => {
    render(
      <MemoryRouter>
        <Pagination firstPage={false} lastPage={false} />
      </MemoryRouter>
    );

    const prevButton = screen.getByRole('button', { name: /prev/i });
    fireEvent.click(prevButton);

    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  test('displays correct current page number if no search params', () => {
    render(
      <MemoryRouter>
        <Pagination firstPage={false} lastPage={false} />
      </MemoryRouter>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
