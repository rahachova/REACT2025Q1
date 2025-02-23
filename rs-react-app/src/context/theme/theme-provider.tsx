import { ReactNode, useCallback, useState } from 'react';
import { ThemeContext } from './theme-context';
import './theme-provider.css';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`${theme} root`}>{children}</div>
    </ThemeContext.Provider>
  );
}
