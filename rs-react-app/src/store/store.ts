import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { selectedMoviesReducer } from './selected-movie-slice';
import { moviesApi } from './services/movies';

const rootReducer = combineReducers({
  selectedMovies: selectedMoviesReducer,
  [moviesApi.reducerPath]: moviesApi.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(moviesApi.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
