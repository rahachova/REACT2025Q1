import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary.tsx';
import { BrowserRouter } from 'react-router';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/theme/theme-provider.tsx';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
