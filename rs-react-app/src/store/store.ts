import { configureStore } from '@reduxjs/toolkit';
import { selectedMoviesReducer } from './selected-movie-slice';
import { moviesApi } from './services/movies';

export const store = configureStore({
  reducer: {
    selectedMovies: selectedMoviesReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
