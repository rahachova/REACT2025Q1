import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './theme-provider';
import { ThemeContext } from './theme-context';
import { useContext } from 'react';

const TestComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <p data-testid="theme">{theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  test('renders children and applies default theme', () => {
    render(
      <ThemeProvider>
        <p>Test Content</p>
      </ThemeProvider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();

    expect(document.querySelector('.root')).toHaveClass('light');
  });

  test('toggles theme when toggleTheme is called', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeText = screen.getByTestId('theme');
    const toggleButton = screen.getByText('Toggle Theme');

    expect(themeText).toHaveTextContent('light');

    await userEvent.click(toggleButton);
    expect(themeText).toHaveTextContent('dark');

    await userEvent.click(toggleButton);
    expect(themeText).toHaveTextContent('light');
  });
});
