import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NotFound } from './NotFound';

describe('NotFound Component', () => {
  test('renders the not found container correctly', () => {
    render(<NotFound />);
    const notFoundContainer = screen.getByText('404 not found');
    expect(notFoundContainer).toBeInTheDocument();
  });
});
