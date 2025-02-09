import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner Component', () => {
  test('renders the spinner container correctly', () => {
    render(<Spinner />);
    const spinnerContainer = screen.getByTestId('spinner');
    expect(spinnerContainer).toBeInTheDocument();
  });
});
