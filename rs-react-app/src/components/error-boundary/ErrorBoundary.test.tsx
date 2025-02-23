import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

const ProblematicComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  test('renders children correctly when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Everything is fine!</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Everything is fine!')).toBeInTheDocument();
  });

  test('renders fallback UI when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
  });

  test('calls componentDidCatch and logs error', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error caught by ErrorBoundary:',
      expect.any(Error),
      expect.any(String)
    );

    consoleErrorSpy.mockRestore();
  });
});
